"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useWallet } from "@/hooks/use-wallets";

import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

const mockContributions = [
  {
    groupId: "1",
    groupName: "Trip to Bali",
    contribution: "$500.00",
    pooledBalance: "$1,250.00",
    share: "40%",
  },
  {
    groupId: "3",
    groupName: "Weekend Camping",
    contribution: "$100.00",
    pooledBalance: "$485.00",
    share: "20.6%",
  },
];

const mockTransactions = [
  {
    id: "1",
    type: "contribution",
    group: "Trip to Bali",
    amount: "$500.00",
    date: "Dec 15, 2024",
    txHash: "0xabc...123",
  },
  {
    id: "2",
    type: "expense",
    group: "Trip to Bali",
    amount: "$420.00",
    date: "Dec 13, 2024",
    txHash: "0xdef...456",
  },
  {
    id: "3",
    type: "contribution",
    group: "Weekend Camping",
    amount: "$100.00",
    date: "Dec 10, 2024",
    txHash: "0xghi...789",
  },
];

export function WalletPageContent() {
  const { isConnected, address } = useWallet();

  const totalContributions = 600.0;
  const totalPooled = 1735.0;

  if (!isConnected) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            Pooled Wallet
          </h1>
          <p className="mt-1 text-muted-foreground">
            Manage your pooled wallet contributions
          </p>
        </div>

        <Card className="border-border">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Wallet className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-semibold text-foreground">
              Connect to View Wallet
            </h3>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Connect your wallet to view and manage your pooled wallet
              contributions.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Pooled Wallet
        </h1>
        <p className="mt-1 text-muted-foreground">
          Manage your pooled wallet contributions across all groups
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Your Total Contributions
              </span>
              <ArrowUpRight className="h-5 w-5 text-success" />
            </div>
            <p className="mt-2 text-3xl font-bold text-success">
              ${totalContributions.toFixed(2)}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Across {mockContributions.length} groups
            </p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Total Pooled Balance
              </span>
              <Wallet className="h-5 w-5 text-primary" />
            </div>
            <p className="mt-2 text-3xl font-bold text-primary">
              ${totalPooled.toFixed(2)}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Combined pool from all groups
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Contributions by Group */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            Contributions by Group
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockContributions.map((group) => (
              <Link
                key={group.groupId}
                href={`/groups/${group.groupId}?tab=wallet`}
              >
                <div className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-muted/50">
                  <div>
                    <p className="font-semibold text-foreground">
                      {group.groupName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Pool: {group.pooledBalance} • Your share: {group.share}
                    </p>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-success/10 text-success"
                  >
                    {group.contribution}
                  </Badge>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockTransactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between rounded-lg border border-border p-3"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      tx.type === "contribution"
                        ? "bg-success/10"
                        : "bg-destructive/10"
                    }`}
                  >
                    {tx.type === "contribution" ? (
                      <ArrowUpRight className="h-4 w-4 text-success" />
                    ) : (
                      <ArrowDownLeft className="h-4 w-4 text-destructive" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {tx.type === "contribution"
                        ? "Contributed to"
                        : "Expense from"}{" "}
                      {tx.group}
                    </p>
                    <p className="text-xs text-muted-foreground">{tx.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`font-semibold ${tx.type === "contribution" ? "text-success" : "text-destructive"}`}
                  >
                    {tx.type === "contribution" ? "+" : "-"}
                    {tx.amount}
                  </span>
                  <a
                    href={`https://polygonscan.com/tx/${tx.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
