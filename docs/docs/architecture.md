---
sidebar_position: 2
---

# Protocol Architecture

SetuX is built on **Solana** using the **Anchor framework**. It leverages **Token-2022 (SPL Token Extensions)** to embed compliance and yield mechanisms directly into the on-chain assets.

## The 5 Core Anchor Programs

### 1. `rupiya-identity` (KYC/Compliance Layer)
This program issues soulbound KYC credentials to users.
- **Mechanism**: It mints a Token-2022 NFT with `NonTransferable` and `DefaultAccountState(Frozen)` extensions.
- **Verification**: The protocol admin verifies the user off-chain and then unfreezes the account.
- **Cross-Program Invocation (CPI)**: All other programs in the SetuX ecosystem CPI into this program to verify if the user's KYC token account is unfrozen before allowing them to transact.

### 2. `rupiya-invoice` (Tokenization Engine)
This program handles the tokenization of real-world invoices.
- **State Machine**: An invoice moves through four states: `Pending` → `Verified` → `Funded` → `Repaid` (or `Defaulted`).
- **Tokenization**: It mints a yield-bearing Token-2022 asset representing the funded invoice, utilizing `InterestBearing`, `TransferHook`, `Metadata`, and `TransferFee` extensions.

### 3. `rupiya-risk` (On-Chain Risk Scoring)
The risk engine evaluates invoices and assigns them a Risk Tier (A, B, C, or D).
- **Inputs**:
  - **Buyer Country Score**: Sourced from a governance lookup table.
  - **Exporter History**: Evaluates the exporter's on-time repayment rate.
  - **Invoice Characteristics**: Penalizes high-concentration invoices and rewards shorter tenors (< 60 days).

### 4. `rupiya-pool` (Liquidity Engine)
The core liquidity protocol where LPs provide USDC.
- **Pools**: A Senior Pool (for Tier A invoices) and a Junior Pool (for Tier B/C invoices).
- **Yield Tokens**: LPs receive `srUPR` or `jrUPR` yield-bearing tokens upon depositing USDC.
- **Mechanics**: When an invoice is funded, USDC is transferred to the exporter. When repaid, principal and interest are distributed back to the pool, allocating losses to the junior tranche first in case of a default.

### 5. `rupiya-governance` (Protocol Parameters)
Stores and manages the updatable protocol parameters.
- **Parameters**: Country risk scores, APY rate bands, advance rates, protocol fee percentage.
- **Authority**: Currently controlled by the admin key (designed to be transitioned to a Squads multisig).
