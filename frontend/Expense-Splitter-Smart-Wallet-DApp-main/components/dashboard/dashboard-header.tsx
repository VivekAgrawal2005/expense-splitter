"use client";

import { useWallet } from "@/hooks/use-wallets";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

export function DashboardHeader() {
  const { isConnected, account, connect, isConnecting } = useWallet();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Dashboard
        </h1>
        <p className="mt-1 text-muted-foreground">
          {isConnected
            ? `Welcome back, ${account}`
            : "Connect your wallet to get started"}
        </p>
      </div>

      {!isConnected && (
        <Button onClick={connect} disabled={isConnecting} className="gap-2">
          <Wallet className="h-4 w-4" />
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </Button>
      )}
    </div>
  );
}
