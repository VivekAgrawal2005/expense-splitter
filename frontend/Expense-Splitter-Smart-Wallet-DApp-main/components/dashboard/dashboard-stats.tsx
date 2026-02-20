"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useWallet } from "@/hooks/use-wallets";
import { Wallet, TrendingUp, TrendingDown, Users } from "lucide-react";

const stats = [
  {
    label: "Total Balance",
    value: "$1,250.00",
    subtext: "Across all groups",
    icon: Wallet,
    trend: null,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    label: "You're Owed",
    value: "$342.50",
    subtext: "From 3 members",
    icon: TrendingUp,
    trend: "up",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    label: "You Owe",
    value: "$127.00",
    subtext: "To 2 members",
    icon: TrendingDown,
    trend: "down",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  {
    label: "Active Groups",
    value: "4",
    subtext: "2 with pending",
    icon: Users,
    trend: null,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
];

export function DashboardStats() {
  const { isConnected } = useWallet();

  if (!isConnected) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="border-border">
            <CardContent className="p-4">
              <Skeleton className="mb-2 h-4 w-24" />
              <Skeleton className="mb-1 h-8 w-32" />
              <Skeleton className="h-3 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card
            key={index}
            className="border-border transition-shadow hover:shadow-md"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {stat.label}
                </span>
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-lg ${stat.bgColor}`}
                >
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </div>
              <div className={`mt-2 text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {stat.subtext}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
