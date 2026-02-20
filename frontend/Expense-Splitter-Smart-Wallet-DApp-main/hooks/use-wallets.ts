"use client";

import { useEffect, useState } from "react";
import { peraWallet } from "@/lib/algorand/wallet";

export function useWallet() {
  const [account, setAccount] = useState<string | null>(null);

  // 🔥 Auto reconnect on page refresh
  useEffect(() => {
    peraWallet
      .reconnectSession()
      .then((accounts) => {
        if (accounts.length) {
          setAccount(accounts[0]);
        }
      })
      .catch(console.error);
  }, []);

  // Connect wallet
  const connect = async () => {
    const accounts = await peraWallet.connect();
    setAccount(accounts[0]);
  };

  // Disconnect wallet
  const disconnect = async () => {
    await peraWallet.disconnect();
    setAccount(null);
  };

  return {
    // aliases (for old UI compatibility)
    address: account,
    isConnected: !!account,
    isConnecting: false, // until we add loading state
    
    // original values
    account,
    connect,
    disconnect,
  }

}
