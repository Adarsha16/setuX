use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token_interface::{mint_to, burn, Mint, MintTo, Burn, TokenAccount, TokenInterface, Transfer, transfer},
};
use rupiya_invoice::Invoice;

declare_id!("4zT8nkzXessaZCuwgX8YEkJ1KGGEny1yTqHRH1DWg4tD");

#[program]
pub mod rupiya_pool {
    use super::*;

    pub fn initialize_pool(ctx: Context<InitializePool>, pool_type: u8) -> Result<()> {
        let pool = &mut ctx.accounts.pool_state;
        pool.pool_type = pool_type; // 1 = Senior, 2 = Junior
        pool.total_deposits = 0;
        pool.total_funded = 0;
        pool.authority_bump = ctx.bumps.pool_authority;
        Ok(())
    }

    pub fn deposit(ctx: Context<Deposit>, amount: u64) -> Result<()> {
        let pool = &mut ctx.accounts.pool_state;
        
        // Transfer USDC from LP to Pool
        let transfer_cpi = Transfer {
            from: ctx.accounts.lp_usdc.to_account_info(),
            to: ctx.accounts.pool_usdc.to_account_info(),
            authority: ctx.accounts.lp.to_account_info(),
        };
        let cpi_ctx = CpiContext::new(ctx.accounts.token_program.to_account_info(), transfer_cpi);
        transfer(cpi_ctx, amount)?;

        pool.total_deposits += amount;

        // Mint LP tokens (1:1 for simplicity)
        let mint_cpi = MintTo {
            mint: ctx.accounts.lp_mint.to_account_info(),
            to: ctx.accounts.lp_token_account.to_account_info(),
            authority: ctx.accounts.pool_authority.to_account_info(),
        };
        
        let pool_type = pool.pool_type.to_le_bytes();
        let signer_seeds: &[&[&[u8]]] = &[&[
            b"pool_auth",
            &pool_type,
            &[pool.authority_bump],
        ]];
        
        let mint_cpi_ctx = CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(), 
            mint_cpi, 
            signer_seeds
        );
        mint_to(mint_cpi_ctx, amount)?;

        Ok(())
    }

    pub fn fund_invoice(ctx: Context<FundInvoice>) -> Result<()> {
        let invoice = &mut ctx.accounts.invoice;
        let pool = &mut ctx.accounts.pool_state;
        
        require!(invoice.status == 1, PoolError::InvoiceNotVerified);
        
        let advance_amount = (invoice.amount_usd * invoice.advance_rate as u64) / 100;
        require!(pool.total_deposits - pool.total_funded >= advance_amount, PoolError::InsufficientLiquidity);

        // Transfer USDC to exporter
        let transfer_cpi = Transfer {
            from: ctx.accounts.pool_usdc.to_account_info(),
            to: ctx.accounts.exporter_usdc.to_account_info(),
            authority: ctx.accounts.pool_authority.to_account_info(),
        };
        
        let pool_type = pool.pool_type.to_le_bytes();
        let signer_seeds: &[&[&[u8]]] = &[&[
            b"pool_auth",
            &pool_type,
            &[pool.authority_bump],
        ]];
        
        let cpi_ctx = CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(), 
            transfer_cpi, 
            signer_seeds
        );
        transfer(cpi_ctx, advance_amount)?;

        pool.total_funded += advance_amount;
        invoice.status = 2; // Funded

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(pool_type: u8)]
pub struct InitializePool<'info> {
    #[account(mut)]
    pub admin: Signer<'info>,

    #[account(
        init,
        payer = admin,
        space = 8 + PoolState::INIT_SPACE,
        seeds = [b"pool", pool_type.to_le_bytes().as_ref()],
        bump
    )]
    pub pool_state: Account<'info, PoolState>,

    /// CHECK: PDA authority for pool
    #[account(
        seeds = [b"pool_auth", pool_type.to_le_bytes().as_ref()],
        bump
    )]
    pub pool_authority: AccountInfo<'info>,

    #[account(
        init,
        payer = admin,
        mint::decimals = 6,
        mint::authority = pool_authority,
        mint::token_program = token_program,
    )]
    pub lp_mint: InterfaceAccount<'info, Mint>,

    pub system_program: Program<'info, System>,
    pub token_program: Interface<'info, TokenInterface>,
}

#[derive(Accounts)]
pub struct Deposit<'info> {
    #[account(mut)]
    pub lp: Signer<'info>,

    #[account(mut)]
    pub pool_state: Account<'info, PoolState>,

    /// CHECK: Pool authority
    #[account(
        seeds = [b"pool_auth", pool_state.pool_type.to_le_bytes().as_ref()],
        bump = pool_state.authority_bump
    )]
    pub pool_authority: AccountInfo<'info>,

    #[account(mut)]
    pub pool_usdc: InterfaceAccount<'info, TokenAccount>,
    
    #[account(mut)]
    pub lp_usdc: InterfaceAccount<'info, TokenAccount>,

    #[account(mut)]
    pub lp_mint: InterfaceAccount<'info, Mint>,

    #[account(mut)]
    pub lp_token_account: InterfaceAccount<'info, TokenAccount>,

    pub token_program: Interface<'info, TokenInterface>,
}

#[derive(Accounts)]
pub struct FundInvoice<'info> {
    #[account(mut)]
    pub admin: Signer<'info>,

    #[account(mut)]
    pub pool_state: Account<'info, PoolState>,

    /// CHECK: Pool authority
    #[account(
        seeds = [b"pool_auth", pool_state.pool_type.to_le_bytes().as_ref()],
        bump = pool_state.authority_bump
    )]
    pub pool_authority: AccountInfo<'info>,

    #[account(mut)]
    pub pool_usdc: InterfaceAccount<'info, TokenAccount>,

    #[account(mut)]
    pub exporter_usdc: InterfaceAccount<'info, TokenAccount>,

    #[account(mut)]
    pub invoice: Account<'info, Invoice>,

    pub token_program: Interface<'info, TokenInterface>,
}

#[account]
#[derive(InitSpace)]
pub struct PoolState {
    pub pool_type: u8,
    pub total_deposits: u64,
    pub total_funded: u64,
    pub authority_bump: u8,
}

#[error_code]
pub enum PoolError {
    #[msg("Invoice must be verified before funding.")]
    InvoiceNotVerified,
    #[msg("Insufficient liquidity in the pool.")]
    InsufficientLiquidity,
}
