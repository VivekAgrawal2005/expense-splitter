"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { peraWallet } from "@/lib/algorand/wallet";

type WalletContextType = {
  address: string | null;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
};

const WalletContext = createContext<WalletContextType>({
  address: null,
  connect: async () => {},
  disconnect: async () => {},
});

export function AlgorandWalletProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    peraWallet.reconnectSession().then((accounts) => {
      if (accounts.length) setAddress(accounts[0]);
    });
  }, []);

  const connect = async () => {
    const accounts = await peraWallet.connect();
    setAddress(accounts[0]);
  };

  const disconnect = async () => {
    await peraWallet.disconnect();
    setAddress(null);
  };

  return (
    <WalletContext.Provider value={{ address, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
}

export const useAlgoWallet = () => useContext(WalletContext);
