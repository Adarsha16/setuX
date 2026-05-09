---
sidebar_position: 1
---

# Introduction to SetuX

**SetuX Protocol** is an on-chain invoice financing marketplace for South Asian exporters, built on Solana.

## The Problem

Nepal currently faces a **$3.6B SME financing gap** (IFC data). The only existing trade finance instrument in Nepal is the traditional letter of credit, which is slow, expensive, and inaccessible to many small exporters. 

Nepali exporters (such as those dealing in carpets, pashminas, and handicrafts) often have binding purchase orders from established US, UK, and EU buyers, but are forced to wait **60–90 days for payment** after shipping their goods. This cash flow gap severely limits their ability to take on new orders and grow their businesses.

## The SetuX Solution

SetuX provides **USDC advances in seconds** against verified invoices. 

By tokenizing trade invoices on Solana using the Token-2022 standard, we create a transparent, efficient marketplace where:
1. **Exporters** receive immediate liquidity to fund their operations.
2. **Liquidity Providers (LPs)** earn real yield (8–18% APY depending on the risk tier) backed by real-world trade, not token emissions.

We are a team from Kathmandu, and our local knowledge of this market is our moat.

## Architecture

SetuX operates via 5 core Anchor programs:
- `rupiya-identity`: Manages soulbound KYC credentials.
- `rupiya-invoice`: Tokenizes invoices into yield-bearing assets.
- `rupiya-risk`: Computes on-chain risk scores and assigns tiers.
- `rupiya-pool`: Manages the Senior and Junior liquidity pools.
- `rupiya-governance`: Manages protocol parameters and risk lookups.
