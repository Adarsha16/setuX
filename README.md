# SetuX Protocol

**Bridging Global Capital to South Asian Trade.**

SetuX is an on-chain invoice financing marketplace built on **Solana**. It tokenizes verified export invoices, giving emerging market suppliers (starting with Nepal) instant USDC liquidity while offering global Liquidity Providers (LPs) real yield backed by real-world trade.

This project was built as a submission for the **Colosseum Frontier Hackathon**.

---

## 📖 The Problem & Solution

Nepal has a **$3.6B SME financing gap**. The only existing trade finance instrument in Nepal is the letter of credit, which is archaic, slow, and expensive. Nepali exporters (dealing in carpets, pashminas, handicrafts) have binding purchase orders from established US/UK/EU buyers but are forced to wait **60–90 days for payment** after shipping.

**SetuX** solves this cash flow gap by providing USDC advances in seconds against verified invoices.
- **Exporters** receive immediate liquidity to scale their operations.
- **LPs** earn sustainable yield (8–18% APY) backed by verified real-world trade, not token emissions.

---

## 🏗 Architecture

SetuX is composed of **five core Anchor programs**, leveraging the latest **Token-2022** (SPL Token Extensions) standards to embed compliance and yield directly into the assets.

### 1. `rupiya-identity` (KYC/Compliance)
Issues soulbound KYC credentials using Token-2022 with `NonTransferable` and `DefaultAccountState(Frozen)` extensions. These NFTs serve as a decentralized identity layer. Other programs perform Cross-Program Invocations (CPI) to this program to verify if a user's KYC is valid (unfrozen by protocol admin) before allowing actions.

### 2. `rupiya-invoice` (Tokenization Engine)
Creates an `Invoice` PDA state machine (Pending → Verified → Funded → Repaid / Defaulted). It mints a Token-2022 invoice token with `InterestBearing`, `TransferHook`, `Metadata`, and `TransferFee` extensions. The minted token represents a yield-bearing LP claim on the underlying real-world invoice.

### 3. `rupiya-risk` (On-Chain Risk Scoring)
Computes a Risk Score (0–100) dynamically based on:
- **Buyer Country Score**: Evaluated via a lookup table (e.g., US/UK=90, IN=75).
- **Exporter Repayment History**: Tracks past on-time repayments vs. defaults.
- **Invoice Characteristics**: Penalizes high concentration and rewards shorter tenor (<60 days).
The score determines the Risk Tier (A, B, C, or D), dictating advance rates and APY.

### 4. `rupiya-pool` (Liquidity Engine)
Manages the **Senior Pool** (Tier A invoices) and **Junior Pool** (Tier B/C invoices). LPs deposit USDC to mint yield-bearing `srUPR` and `jrUPR` tokens. It handles the distribution of principal and accrued interest upon invoice settlement and handles loss allocation in case of default.

### 5. `rupiya-governance` (Protocol Parameters)
Stores updatable protocol parameters such as country risk lookup tables, APY rate bands, advance rates, and protocol fee percentages.

---

## 💻 Tech Stack

- **Smart Contracts**: Rust, Anchor (v0.32.1), Solana Devnet
- **Token Standard**: Token-2022 (`spl-token-2022` with Extensions)
- **Frontend**: Next.js 14 (App Router), Tailwind CSS, Lucide-React
- **Web3 Integration**: `@solana/wallet-adapter-react`, `@solana/web3.js`, `@coral-xyz/anchor`
- **Documentation**: Docusaurus (located in the `docs/` directory)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Rust & Cargo
- Solana CLI (v1.18+)
- Anchor CLI (v0.32.1)
- Yarn

### 1. Smart Contracts (Anchor)
Navigate to the `anchor/` directory to build the programs.
```bash
cd anchor
yarn install
anchor build
```
*(To test locally, deploy the programs to a `solana-test-validator` instance).*

### 2. Frontend (Next.js)
Navigate to the `web/` directory. The UI features an Analytics Dashboard, Exporter Portal, and LP Marketplace.
```bash
cd web
npm install
npm run dev
```
Open `http://localhost:3000` to view the application.

### 3. Documentation (Docusaurus)
Navigate to the `docs/` directory to read the full protocol documentation.
```bash
cd docs
npm install
npm start
```

---

## 🎨 UI Aesthetics
The frontend uses a custom-built, premium financial-terminal theme.
- **Background**: Deep rich black (`#050505`)
- **Panels**: Subtle dark gray (`#121212`)
- **Accent**: Emerald Green (`#10B981`)
- **Typography**: Playfair Display (Headers), Inter (Body), Space Mono (Data)

---

## 📜 License
MIT
