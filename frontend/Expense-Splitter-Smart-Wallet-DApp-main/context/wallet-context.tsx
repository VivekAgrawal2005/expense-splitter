"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { peraWallet } from "@/lib/algorand/wallet";

type WalletContextType = {
  account: string | null;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
};

const WalletContext = createContext<WalletContextType | null>(null);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [account, setAccount] = useState<string | null>(null);

  // 🔥 Auto reconnect once globally
  useEffect(() => {
    peraWallet
      .reconnectSession()
      .then((accounts) => {
        if (accounts.length) setAccount(accounts[0]);
      })
      .catch(console.error);
  }, []);

  const connect = async () => {
    const accounts = await peraWallet.connect();
    setAccount(accounts[0]);
  };

  const disconnect = async () => {
    await peraWallet.disconnect();
    setAccount(null);
  };

  return (
    <WalletContext.Provider value={{ account, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWalletContext() {
  const ctx = useContext(WalletContext);
  if (!ctx)
    throw new Error("useWalletContext must be used inside WalletProvider");
  return ctx;
}
