---
sidebar_position: 3
---

# Exporter Guide

Welcome to SetuX. As an exporter, you can tokenize your verified trade invoices to receive immediate USDC liquidity, bypassing the standard 60-90 day waiting periods for international payments.

## Getting Started

### 1. Obtain Your KYC Credential
Before submitting an invoice, you must complete the off-chain KYC process.
1. Connect your Solana wallet to the SetuX Exporter Portal.
2. Complete the identity verification flow via our compliance partner.
3. Once approved, the protocol admin will unfreeze your soulbound KYC Token-2022 credential.

### 2. Submit an Invoice
Navigate to the **Exporter Dashboard**.
1. Enter the Invoice Amount (in USD).
2. Enter the Buyer Name and Country.
3. Set the Due Date (e.g., 30, 60, or 90 days).
4. Upload the Invoice Document (PDF/JPEG). The document is hashed and pinned to IPFS.
5. Click **Tokenize & Submit**.

### 3. Funding & Repayment
- **Verification**: The SetuX risk engine will evaluate the invoice and assign it a Risk Tier. Once verified, it becomes eligible for funding from the Liquidity Pools.
- **Funding**: Once funded by the pool, the USDC advance is transferred directly to your Solana wallet. The advance rate depends on the assigned risk tier (e.g., 88% for Tier A).
- **Repayment**: When your buyer pays the invoice, navigate to the **Active Invoices** table and click **Repay**. You must repay the principal plus the accrued interest in USDC.
