"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useWallet } from "@/hooks/use-wallets";
import {
  Bell,
  AlertTriangle,
  CheckCircle,
  Clock,
  Receipt,
  X,
} from "lucide-react";
import { useState } from "react";

const mockNotifications = [
  {
    id: "1",
    type: "approval",
    title: "Expense Pending Approval",
    message: "Alex added $85.00 for 'Uber to airport'",
    group: "Trip to Bali",
    time: "5 min ago",
    read: false,
  },
  {
    id: "2",
    type: "dispute",
    title: "Expense Disputed",
    message: "Jordan disputed $42.00 'Bar tab' expense",
    group: "Weekend Camping",
    time: "1 hour ago",
    read: false,
  },
  {
    id: "3",
    type: "settled",
    title: "Settlement Complete",
    message: "You received $127.50 from Sarah",
    group: "Monthly Rent",
    time: "3 hours ago",
    read: true,
  },
  {
    id: "4",
    type: "receipt",
    title: "Receipt Uploaded",
    message: "OCR processed for hotel booking",
    group: "Trip to Bali",
    time: "Yesterday",
    read: true,
  },
];

export function NotificationsSidebar() {
  const { isConnected } = useWallet();
  const [notifications, setNotifications] = useState(mockNotifications);

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  if (!isConnected) {
    return (
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <Bell className="h-4 w-4" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Connect wallet to see notifications
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <Bell className="h-4 w-4" />
          Notifications
          {unreadCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {unreadCount}
            </span>
          )}
        </CardTitle>
        {notifications.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground"
            onClick={() => setNotifications([])}
          >
            Clear All
          </Button>
        )}
      </CardHeader>
      <CardContent className="p-0">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Bell className="mb-2 h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">No notifications</p>
          </div>
        ) : (
          <ScrollArea className="h-[400px]">
            <div className="space-y-1 p-2">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`group relative rounded-lg p-3 transition-colors hover:bg-muted ${
                    !notification.read ? "bg-primary/5" : ""
                  }`}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                    onClick={() => dismissNotification(notification.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>

                  <div className="flex gap-3">
                    <NotificationIcon type={notification.type} />
                    <div className="flex-1 pr-6">
                      <p className="text-sm font-medium text-foreground">
                        {notification.title}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {notification.message}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                          {notification.group}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {notification.time}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}

function NotificationIcon({ type }: { type: string }) {
  switch (type) {
    case "approval":
      return (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-warning/10">
          <Clock className="h-4 w-4 text-warning" />
        </div>
      );
    case "dispute":
      return (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-4 w-4 text-destructive" />
        </div>
      );
    case "settled":
      return (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-success/10">
          <CheckCircle className="h-4 w-4 text-success" />
        </div>
      );
    case "receipt":
      return (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <Receipt className="h-4 w-4 text-primary" />
        </div>
      );
    default:
      return (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
          <Bell className="h-4 w-4 text-muted-foreground" />
        </div>
      );
  }
}
