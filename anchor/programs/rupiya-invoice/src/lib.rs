use anchor_lang::prelude::*;
use anchor_lang::system_program::{transfer, Transfer};
use anchor_spl::{
    associated_token::AssociatedToken,
    token_interface::{mint_to, Mint, MintTo, TokenAccount, TokenInterface},
};
use rupiya_identity::KycRecord;
use rupiya_governance::ProtocolParams;

declare_id!("ChWnVjCWH6M1SGSRyEfz2CBTpW6hZxK21YRtQZ2kNswJ");

#[program]
pub mod rupiya_invoice {
    use super::*;

    pub fn submit_invoice(
        ctx: Context<SubmitInvoice>,
        invoice_amount_usd: u64,
        buyer_country: String,
        buyer_name: String,
        invoice_due_date: i64,
        ipfs_document_hash: String,
        advance_rate: u8,
    ) -> Result<()> {
        let kyc_record = &ctx.accounts.exporter_kyc;
        require!(!kyc_record.is_frozen, InvoiceError::KycFrozen);
        require!(kyc_record.entity_type == 1 || kyc_record.entity_type == 3, InvoiceError::NotAnExporter);

        let invoice = &mut ctx.accounts.invoice;
        invoice.exporter = ctx.accounts.exporter.key();
        invoice.mint = ctx.accounts.mint.key();
        invoice.amount_usd = invoice_amount_usd;
        invoice.buyer_country = buyer_country;
        invoice.buyer_name = buyer_name;
        invoice.due_date = invoice_due_date;
        invoice.ipfs_hash = ipfs_document_hash;
        invoice.advance_rate = advance_rate;
        invoice.status = InvoiceStatus::Pending as u8;
        
        Ok(())
    }

    pub fn update_status(
        ctx: Context<UpdateStatus>,
        new_status: u8,
    ) -> Result<()> {
        // Only protocol admin can verify/mark defaulted for now
        let invoice = &mut ctx.accounts.invoice;
        invoice.status = new_status;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct SubmitInvoice<'info> {
    #[account(mut)]
    pub exporter: Signer<'info>,

    #[account(
        seeds = [b"kyc", exporter.key().as_ref()],
        seeds::program = rupiya_identity::ID,
        bump
    )]
    pub exporter_kyc: Account<'info, KycRecord>,

    #[account(
        init,
        payer = exporter,
        space = 8 + Invoice::INIT_SPACE,
        seeds = [b"invoice", mint.key().as_ref()],
        bump
    )]
    pub invoice: Account<'info, Invoice>,

    /// CHECK: The mint account to be initialized with Token-2022
    #[account(mut)]
    pub mint: Signer<'info>,

    pub system_program: Program<'info, System>,
    pub token_program: Interface<'info, TokenInterface>,
}

#[derive(Accounts)]
pub struct UpdateStatus<'info> {
    #[account(mut)]
    pub admin: Signer<'info>,

    #[account(
        seeds = [b"protocol_params"],
        seeds::program = rupiya_governance::ID,
        bump,
        has_one = admin
    )]
    pub protocol_params: Account<'info, ProtocolParams>,

    #[account(mut)]
    pub invoice: Account<'info, Invoice>,
}

#[account]
#[derive(InitSpace)]
pub struct Invoice {
    pub exporter: Pubkey,
    pub mint: Pubkey,
    pub amount_usd: u64,
    #[max_len(3)]
    pub buyer_country: String,
    #[max_len(50)]
    pub buyer_name: String,
    pub due_date: i64,
    #[max_len(64)]
    pub ipfs_hash: String,
    pub advance_rate: u8,
    pub status: u8,
    pub risk_score: u8,
}

#[repr(u8)]
pub enum InvoiceStatus {
    Pending = 0,
    Verified = 1,
    Funded = 2,
    Repaid = 3,
    Defaulted = 4,
}

#[error_code]
pub enum InvoiceError {
    #[msg("KYC Credential is frozen. Waiting for verification.")]
    KycFrozen,
    #[msg("Only exporters can submit invoices.")]
    NotAnExporter,
}
