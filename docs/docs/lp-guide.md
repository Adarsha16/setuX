---
sidebar_position: 4
---

# Liquidity Provider (LP) Guide

SetuX allows global capital to earn sustainable, real-world yield by financing emerging market trade invoices.

## Understanding the Yield

Unlike traditional DeFi protocols that rely on token emissions, SetuX yield comes from the interest paid by exporters on their short-term invoice financing.

### Risk Tiers & Pools
SetuX operates two primary liquidity pools:
- **Senior Pool (Tier A Invoices)**: Lower risk, focusing on established buyers in low-risk jurisdictions (US, UK, DE). Yields approximately **8% APY**.
- **Junior Pool (Tier B & C Invoices)**: Higher risk, absorbing first-loss capital in the event of an exporter default. Yields between **12-18% APY**.

## How to Provide Liquidity

### 1. Complete KYC
To comply with global regulations, LPs must hold a verified SetuX KYC credential. Connect your wallet to the LP Marketplace and complete the onboarding flow.

### 2. Supply USDC
1. Navigate to the **LP Marketplace**.
2. Review the Active Market table to see the current pipeline of verified invoices awaiting funding.
3. Deposit USDC into either the Senior or Junior Pool.
4. You will receive `srUPR` or `jrUPR` Token-2022 LP tokens representing your proportional share of the pool. These tokens accrue yield automatically via the `InterestBearing` extension.

### 3. Withdrawals
You can burn your `srUPR` or `jrUPR` tokens at any time to redeem your underlying USDC plus accrued yield, provided there is sufficient unutilized liquidity in the pool.
