"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useWallet } from "@/hooks/use-wallets";
import {
  Users,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
} from "lucide-react";

const mockGroups = [
  {
    id: "1",
    name: "Trip to Bali",
    members: 5,
    balance: "$1,250.00",
    pendingExpenses: 2,
    status: "active",
    yourBalance: "+$215.50",
    yourBalanceType: "owed",
  },
  {
    id: "2",
    name: "Monthly Rent",
    members: 3,
    balance: "$3,200.00",
    pendingExpenses: 0,
    status: "settled",
    yourBalance: "$0.00",
    yourBalanceType: "settled",
  },
  {
    id: "3",
    name: "Weekend Camping",
    members: 8,
    balance: "$485.00",
    pendingExpenses: 1,
    status: "dispute",
    yourBalance: "-$127.00",
    yourBalanceType: "owes",
  },
  {
    id: "4",
    name: "Office Lunch Club",
    members: 12,
    balance: "$89.50",
    pendingExpenses: 0,
    status: "active",
    yourBalance: "+$12.00",
    yourBalanceType: "owed",
  },
];

export function GroupsGrid() {
  const { isConnected } = useWallet();

  if (!isConnected) {
    return (
      <Card className="border-border">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <Users className="mb-4 h-12 w-12 text-muted-foreground" />
          <h3 className="text-lg font-semibold text-foreground">
            Connect to View Groups
          </h3>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Connect your wallet to view your expense groups and balances.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base font-semibold">Your Groups</CardTitle>
        <Link
          href="/groups"
          className="flex items-center gap-1 text-sm text-primary hover:underline"
        >
          View All
          <ArrowRight className="h-3 w-3" />
        </Link>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          {mockGroups.map((group) => (
            <Link key={group.id} href={`/groups/${group.id}`}>
              <div className="group rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">
                      {group.name}
                    </h3>
                    <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-3.5 w-3.5" />
                      {group.members} members
                    </div>
                  </div>
                  <StatusBadge
                    status={group.status}
                    pending={group.pendingExpenses}
                  />
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Pooled Balance
                    </p>
                    <p className="font-semibold text-card-foreground">
                      {group.balance}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      Your Balance
                    </p>
                    <p
                      className={`font-semibold ${
                        group.yourBalanceType === "owed"
                          ? "text-success"
                          : group.yourBalanceType === "owes"
                            ? "text-destructive"
                            : "text-muted-foreground"
                      }`}
                    >
                      {group.yourBalance}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status, pending }: { status: string; pending: number }) {
  if (status === "dispute") {
    return (
      <Badge variant="destructive" className="gap-1">
        <AlertCircle className="h-3 w-3" />
        Dispute
      </Badge>
    );
  }

  if (pending > 0) {
    return (
      <Badge variant="secondary" className="gap-1 bg-warning/10 text-warning">
        <Clock className="h-3 w-3" />
        {pending} Pending
      </Badge>
    );
  }

  if (status === "settled") {
    return (
      <Badge variant="secondary" className="gap-1 bg-success/10 text-success">
        <CheckCircle2 className="h-3 w-3" />
        Settled
      </Badge>
    );
  }

  return (
    <Badge variant="secondary" className="gap-1 bg-primary/10 text-primary">
      Active
    </Badge>
  );
}
