use anchor_lang::prelude::*;
use rupiya_governance::CountryRisk;
use rupiya_invoice::Invoice;

declare_id!("C7NmWwwqLxRDZH8DJEqFg4bx3ZQCiQ3yqn9Pycs3NG3k");

#[program]
pub mod rupiya_risk {
    use super::*;

    pub fn compute_risk(ctx: Context<ComputeRisk>) -> Result<()> {
        let country_risk = match &ctx.accounts.country_risk {
            Some(account) => account.score,
            None => 40, // unknown country
        };

        let profile = &ctx.accounts.exporter_profile;
        let mut history_score: i32 = 0;
        
        // simple history logic
        if profile.invoices_submitted > 0 {
            let repayment_rate = (profile.repaid_on_time as u64 * 100) / profile.invoices_submitted as u64;
            if repayment_rate > 95 { history_score += 15; }
            else if repayment_rate > 80 { history_score += 5; }
            else if repayment_rate < 50 { history_score -= 20; }
        }

        let invoice = &mut ctx.accounts.invoice;
        let mut char_score: i32 = 0;

        if invoice.amount_usd > 100_000 {
            char_score -= 10;
        } else if invoice.amount_usd < 10_000 {
            char_score += 5;
        }

        // 60 days in seconds = 5184000
        let current_time = Clock::get()?.unix_timestamp;
        let tenor = invoice.due_date - current_time;
        if tenor < 5184000 {
            char_score += 5; // rewards <60 day tenor
        }

        let mut final_score = (country_risk as i32) + history_score + char_score;
        if final_score > 100 { final_score = 100; }
        if final_score < 0 { final_score = 0; }

        invoice.risk_score = final_score as u8;

        Ok(())
    }

    pub fn init_exporter_profile(ctx: Context<InitProfile>) -> Result<()> {
        let profile = &mut ctx.accounts.exporter_profile;
        profile.owner = ctx.accounts.exporter.key();
        profile.invoices_submitted = 0;
        profile.repaid_on_time = 0;
        profile.defaulted = 0;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct ComputeRisk<'info> {
    #[account(mut)]
    pub invoice: Account<'info, Invoice>,

    #[account(
        seeds = [b"country_risk", invoice.buyer_country.as_bytes()],
        seeds::program = rupiya_governance::ID,
        bump
    )]
    pub country_risk: Option<Account<'info, CountryRisk>>,

    #[account(
        seeds = [b"profile", invoice.exporter.as_ref()],
        bump
    )]
    pub exporter_profile: Account<'info, ExporterProfile>,
}

#[derive(Accounts)]
pub struct InitProfile<'info> {
    #[account(mut)]
    pub exporter: Signer<'info>,

    #[account(
        init,
        payer = exporter,
        space = 8 + ExporterProfile::INIT_SPACE,
        seeds = [b"profile", exporter.key().as_ref()],
        bump
    )]
    pub exporter_profile: Account<'info, ExporterProfile>,

    pub system_program: Program<'info, System>,
}

#[account]
#[derive(InitSpace)]
pub struct ExporterProfile {
    pub owner: Pubkey,
    pub invoices_submitted: u32,
    pub repaid_on_time: u32,
    pub defaulted: u32,
}
