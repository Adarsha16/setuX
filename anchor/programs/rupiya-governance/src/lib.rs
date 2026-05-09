use anchor_lang::prelude::*;

declare_id!("524f1EDgY17NZCNxTYWS8gTV2eeFxkuxsWc8WgEadagD");

#[program]
pub mod rupiya_governance {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let protocol_params = &mut ctx.accounts.protocol_params;
        protocol_params.admin = ctx.accounts.admin.key();
        protocol_params.protocol_fee_bps = 50; // 0.5%
        
        // Tier A
        protocol_params.tier_a_apy = 800; // 8%
        protocol_params.tier_a_advance_rate = 88;
        
        // Tier B
        protocol_params.tier_b_apy = 1200; // 12%
        protocol_params.tier_b_advance_rate = 83;
        
        // Tier C
        protocol_params.tier_c_apy = 1800; // 18%
        protocol_params.tier_c_advance_rate = 75;

        Ok(())
    }

    pub fn update_params(
        ctx: Context<UpdateParams>,
        protocol_fee_bps: Option<u16>,
        tier_a_apy: Option<u16>,
        tier_a_advance_rate: Option<u8>,
        tier_b_apy: Option<u16>,
        tier_b_advance_rate: Option<u8>,
        tier_c_apy: Option<u16>,
        tier_c_advance_rate: Option<u8>,
    ) -> Result<()> {
        let protocol_params = &mut ctx.accounts.protocol_params;
        
        if let Some(fee) = protocol_fee_bps {
            protocol_params.protocol_fee_bps = fee;
        }
        if let Some(apy) = tier_a_apy {
            protocol_params.tier_a_apy = apy;
        }
        if let Some(rate) = tier_a_advance_rate {
            protocol_params.tier_a_advance_rate = rate;
        }
        if let Some(apy) = tier_b_apy {
            protocol_params.tier_b_apy = apy;
        }
        if let Some(rate) = tier_b_advance_rate {
            protocol_params.tier_b_advance_rate = rate;
        }
        if let Some(apy) = tier_c_apy {
            protocol_params.tier_c_apy = apy;
        }
        if let Some(rate) = tier_c_advance_rate {
            protocol_params.tier_c_advance_rate = rate;
        }

        Ok(())
    }

    pub fn set_country_risk(
        ctx: Context<SetCountryRisk>,
        country_code: String,
        score: u8,
    ) -> Result<()> {
        let lookup = &mut ctx.accounts.country_risk_lookup;
        lookup.country_code = country_code;
        lookup.score = score;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = admin,
        space = 8 + ProtocolParams::INIT_SPACE,
        seeds = [b"protocol_params"],
        bump
    )]
    pub protocol_params: Account<'info, ProtocolParams>,
    #[account(mut)]
    pub admin: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateParams<'info> {
    #[account(
        mut,
        seeds = [b"protocol_params"],
        bump,
        has_one = admin
    )]
    pub protocol_params: Account<'info, ProtocolParams>,
    pub admin: Signer<'info>,
}

#[derive(Accounts)]
#[instruction(country_code: String)]
pub struct SetCountryRisk<'info> {
    #[account(
        init_if_needed,
        payer = admin,
        space = 8 + CountryRisk::INIT_SPACE,
        seeds = [b"country_risk", country_code.as_bytes()],
        bump
    )]
    pub country_risk_lookup: Account<'info, CountryRisk>,
    #[account(
        mut,
        seeds = [b"protocol_params"],
        bump,
        has_one = admin
    )]
    pub protocol_params: Account<'info, ProtocolParams>,
    #[account(mut)]
    pub admin: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
#[derive(InitSpace)]
pub struct ProtocolParams {
    pub admin: Pubkey,
    pub protocol_fee_bps: u16,
    pub tier_a_apy: u16,
    pub tier_a_advance_rate: u8,
    pub tier_b_apy: u16,
    pub tier_b_advance_rate: u8,
    pub tier_c_apy: u16,
    pub tier_c_advance_rate: u8,
}

#[account]
#[derive(InitSpace)]
pub struct CountryRisk {
    #[max_len(3)]
    pub country_code: String, // e.g. "US", "UK", "IN"
    pub score: u8, // 0-100
}
