"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useWallet } from "@/hooks/use-wallets";
import {
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Wallet,
  ArrowLeftRight,
} from "lucide-react";
import Link from "next/link";

const mockGlobalSettlements = [
  {
    groupId: "1",
    groupName: "Trip to Bali",
    yourBalance: "+$215.50",
    balanceType: "owed",
    pendingSettlements: 2,
  },
  {
    groupId: "3",
    groupName: "Weekend Camping",
    yourBalance: "-$127.00",
    balanceType: "owes",
    pendingSettlements: 1,
  },
];

export function GlobalSettlementsContent() {
  const { isConnected } = useWallet();

  const totalOwed = 215.5;
  const totalOwes = 127.0;
  const netBalance = totalOwed - totalOwes;

  if (!isConnected) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            Settlements
          </h1>
          <p className="mt-1 text-muted-foreground">
            View and manage all your settlements
          </p>
        </div>

        <Card className="border-border">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <ArrowLeftRight className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-semibold text-foreground">
              Connect to View Settlements
            </h3>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Connect your wallet to view and manage your settlement balances.
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
          Settlements
        </h1>
        <p className="mt-1 text-muted-foreground">
          View and manage all your settlements across groups
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Total Owed to You
              </span>
              <TrendingUp className="h-5 w-5 text-success" />
            </div>
            <p className="mt-2 text-3xl font-bold text-success">
              ${totalOwed.toFixed(2)}
            </p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Total You Owe
              </span>
              <TrendingDown className="h-5 w-5 text-destructive" />
            </div>
            <p className="mt-2 text-3xl font-bold text-destructive">
              ${totalOwes.toFixed(2)}
            </p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Net Balance</span>
              <Wallet className="h-5 w-5 text-primary" />
            </div>
            <p
              className={`mt-2 text-3xl font-bold ${netBalance >= 0 ? "text-success" : "text-destructive"}`}
            >
              {netBalance >= 0 ? "+" : ""}${netBalance.toFixed(2)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Per Group Settlements */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            Settlements by Group
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockGlobalSettlements.map((group) => (
              <Link
                key={group.groupId}
                href={`/groups/${group.groupId}?tab=settlements`}
              >
                <div className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-muted/50">
                  <div>
                    <p className="font-semibold text-foreground">
                      {group.groupName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {group.pendingSettlements} pending settlements
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="secondary"
                      className={
                        group.balanceType === "owed"
                          ? "bg-success/10 text-success"
                          : "bg-destructive/10 text-destructive"
                      }
                    >
                      {group.yourBalance}
                    </Badge>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
