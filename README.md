# SplitChain — Decentralized Expense Splitter

SplitChain is a decentralized group expense management system built on Algorand.

## Architecture

- frontend → Next.js + Pera Wallet
- contracts → AlgoKit smart contracts (ARC4)

## Features

- Group expense splitting
- On-chain membership (opt-in)
- Wallet-based authentication
- Gas-efficient pooled transactions

## Run Locally

### Frontend

cd frontend
npm install
npm run dev

### Smart Contracts

cd contracts/projects/expense_splitter_algorand-contracts
poetry install
algokit project deploy testnet
