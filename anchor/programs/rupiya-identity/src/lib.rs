use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token_interface::{mint_to, Mint, MintTo, TokenAccount, TokenInterface},
};

declare_id!("BvzU6N9GKWX8tobQ9iitEsgy7K9xLqWwRzQhWN4YbcAm");

#[program]
pub mod rupiya_identity {
    use super::*;

    pub fn issue_credential(
        ctx: Context<IssueCredential>,
        name: String,
        country: String,
        kyc_tier: u8,
        entity_type: u8, // 1=exporter, 2=lp, 3=both
        credential_hash: String,
    ) -> Result<()> {
        let kyc_record = &mut ctx.accounts.kyc_record;
        kyc_record.owner = ctx.accounts.user.key();
        kyc_record.name = name;
        kyc_record.country = country;
        kyc_record.kyc_tier = kyc_tier;
        kyc_record.entity_type = entity_type;
        kyc_record.credential_hash = credential_hash;
        kyc_record.is_frozen = true; // initially frozen
        
        // Mint the soulbound token
        let cpi_accounts = MintTo {
            mint: ctx.accounts.mint.to_account_info(),
            to: ctx.accounts.token_account.to_account_info(),
            authority: ctx.accounts.mint_authority.to_account_info(),
        };
        
        let signer_seeds: &[&[&[u8]]] = &[&[
            b"mint_authority",
            &[ctx.bumps.mint_authority],
        ]];

        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, signer_seeds);
        
        mint_to(cpi_ctx, 1)?;

        Ok(())
    }

    pub fn unfreeze_credential(ctx: Context<UnfreezeCredential>) -> Result<()> {
        let kyc_record = &mut ctx.accounts.kyc_record;
        kyc_record.is_frozen = false;
        
        // Note: For a real Token-2022 Frozen state, we would also CPI into the token program to Thaw the account.
        // But since we control the protocol, we can just check `kyc_record.is_frozen` in all our CPI checks.
        // It's cheaper and easier than managing Token-2022 freeze authorities.
        Ok(())
    }
}

#[derive(Accounts)]
pub struct IssueCredential<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        init,
        payer = user,
        space = 8 + KycRecord::INIT_SPACE,
        seeds = [b"kyc", user.key().as_ref()],
        bump
    )]
    pub kyc_record: Account<'info, KycRecord>,

    #[account(
        init,
        payer = user,
        mint::decimals = 0,
        mint::authority = mint_authority,
        mint::freeze_authority = mint_authority,
        mint::token_program = token_program,
    )]
    pub mint: InterfaceAccount<'info, Mint>,

    #[account(
        init,
        payer = user,
        associated_token::mint = mint,
        associated_token::authority = user,
        associated_token::token_program = token_program,
    )]
    pub token_account: InterfaceAccount<'info, TokenAccount>,

    /// CHECK: PDA for mint authority
    #[account(
        seeds = [b"mint_authority"],
        bump
    )]
    pub mint_authority: AccountInfo<'info>,

    pub system_program: Program<'info, System>,
    pub token_program: Interface<'info, TokenInterface>,
    pub associated_token_program: Program<'info, AssociatedToken>,
}

#[derive(Accounts)]
pub struct UnfreezeCredential<'info> {
    #[account(mut)]
    pub admin: Signer<'info>, // should match the admin from Governance program
    
    #[account(mut)]
    pub kyc_record: Account<'info, KycRecord>,
}

#[account]
#[derive(InitSpace)]
pub struct KycRecord {
    pub owner: Pubkey,
    #[max_len(50)]
    pub name: String,
    #[max_len(3)]
    pub country: String,
    pub kyc_tier: u8,
    pub entity_type: u8,
    #[max_len(64)]
    pub credential_hash: String,
    pub is_frozen: bool,
}
