# 🚀 SplitChain — Decentralized Expense Splitter & Smart Wallet

SplitChain is a **Web3-based expense splitting platform** built on **Algorand**, designed to enable trustless group expense management, pooled wallets, and transparent on-chain settlements.

It combines:

- ⚡ Fast & low-fee Algorand smart contracts
- 💰 Group pooled wallets
- 🔐 Wallet-based authentication (Pera Wallet)
- 📊 Real-time group expense tracking
- 🌐 Modern Next.js frontend

---

## 🧠 Problem Statement

Traditional expense splitting apps rely on centralized databases and trust between users.

Problems:
- No proof of payments
- Manual settlement tracking
- Centralized control
- Lack of transparency

SplitChain solves this by moving group logic **on-chain**, ensuring:

✔ Trustless settlements  
✔ Transparent balances  
✔ Immutable payment history  
✔ Wallet-based ownership  

---

## ✨ Features

### 👥 Group Management
- Create expense groups
- Join groups via Group App ID
- On-chain membership opt-in

### 💰 Pooled Smart Wallet
- Shared group funds
- Transparent balance tracking
- Gas-efficient pooled transactions

### 🔗 Wallet Integration
- Pera Wallet connection
- Transaction signing
- Auto reconnect support

### 📊 On-chain Data
- Groups fetched directly from Algorand
- Smart contract-based state management

### ⚡ Performance
- Algorand low transaction fees
- Fast finality (≈ 4 sec)

---

## 🏗️ Project Architecture

expense-splitter
│
├── frontend/ # Next.js Frontend (UI + Wallet)
│ ├── app/
│ ├── components/
│ ├── hooks/
│ └── lib/algorand/
│
└── contracts/ # Algorand Smart Contracts
├── smart_contracts/
├── artifacts/
└── deploy scripts


---

## 🧩 Tech Stack

### Frontend
- Next.js 16
- React
- TypeScript
- Tailwind CSS
- ShadCN UI

### Blockchain
- Algorand
- AlgoKit
- AlgoPy (ARC4 contracts)
- Algorand SDK (algosdk)

### Wallet
- Pera Wallet Connect

---

## ⚙️ Smart Contract Overview

### ExpenseSplitterContract

Main on-chain methods:

- `create(group_name)`
- `opt_in_member()`
- `update_balance(amount)`
- `get_balance()`

Global state:

- group name
- member count
- pooled balance

---

## 🔧 Setup Instructions

---

### 1️⃣ Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/expense-splitter.git
cd expense-splitter
```
2️⃣ Frontend Setup
```bash
cd frontend/Expense-Splitter-Smart-Wallet-DApp-main

npm install
npm run dev
```
App runs at:
http://localhost:3000

3️⃣ Smart Contract Setup
```bash
cd contracts/expense_splitter_algorand/projects/expense_splitter_algorand-contracts
```
Install dependencies:
```bash
algokit project bootstrap all
```
4️⃣ Configure Testnet Wallet

Create .env:
DEPLOYER_MNEMONIC="YOUR_25_WORD_MNEMONIC"

5️⃣ Build Contract
```bash
poetry run python -m smart_contracts build
```
6️⃣ Deploy to Algorand Testnet
```bash
algokit project deploy testnet
```
You will get:

App ID: 755799588
Use this App ID in frontend.

🔗 Wallet Connection Flow
Connect Pera Wallet

Sign transaction

Opt-in to group (on-chain)

Group appears in UI

🧪 Testnet Explorer
You can inspect transactions:

https://lora.algokit.io/testnet
🚧 Current Development Status
Completed
Wallet connection

Smart contract deployment

Group opt-in flow

Dynamic group fetching

Wallet persistence

In Progress
Expense creation

Settlement logic

Group balance updates

NFT payment proofs

🏆 Hackathon Innovation Ideas
Gas-efficient pooled settlements

On-chain proof-of-payment NFTs

Enterprise expense validation

AI-assisted expense categorization

🧑‍💻 Authors
Vivek Agrawal

AI/DS Engineering Student

Blockchain & Web3 Developer

Hackathon Builder

📜 License
MIT License

❤️ Acknowledgements
Algorand Foundation

AlgoKit

Pera Wallet

Open-source Web3 community
