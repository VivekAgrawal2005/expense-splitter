"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useWallet } from "@/hooks/use-wallets";
import {
  Wallet,
  Copy,
  ExternalLink,
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  Users,
  Banknote,
  ArrowLeftRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/groups", label: "Groups", icon: Users },
  { href: "/wallet", label: "Pooled Wallet", icon: Banknote },
  { href: "/settlements", label: "Settlements", icon: ArrowLeftRight },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { account, connect, disconnect } = useWallet();

  const isConnected = !!account;
  const address = account;

  const isConnecting = false;
  const pendingTxCount = 0;

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Banknote className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">
              SplitChain
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hidden sm:flex"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Network Indicator
            {isConnected && (
              <div
                className={cn(
                  "hidden sm:flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium",
                  isWrongNetwork
                    ? "bg-destructive/10 text-destructive"
                    : "bg-success/10 text-success",
                )}
              >
                <span
                  className={cn(
                    "h-2 w-2 rounded-full",
                    isWrongNetwork ? "bg-destructive" : "bg-success",
                  )}
                />
                {isWrongNetwork ? "Wrong Network" : "Polygon"}
              </div>
            )} */}

            {/* Pending Transactions */}
            {pendingTxCount > 0 && (
              <div className="flex items-center gap-1.5 rounded-full bg-warning/10 px-3 py-1.5 text-xs font-medium text-warning">
                <Loader2 className="h-3 w-3 animate-spin" />
                {pendingTxCount} pending
              </div>
            )}

            {/* Wallet Button */}
            {isConnected ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <Wallet className="h-4 w-4" />
                    <span className="hidden sm:inline">{address}</span>
                    <span className="sm:hidden">Wallet</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-xs text-muted-foreground">Connected</p>
                    <p className="font-mono text-sm">{address}</p>
                  </div>
                  {/* <DropdownMenuSeparator />
                  {isWrongNetwork && (
                    <>
                      <DropdownMenuItem
                        onClick={() => switchNetwork(POLYGON_CHAIN_ID)}
                        className="text-destructive"
                      >
                        <AlertCircle className="mr-2 h-4 w-4" />
                        Switch to Polygon
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )} */}
                  <DropdownMenuItem onClick={copyAddress}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Address
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a
                      href={`https://lora.algokit.io/testnet/account/${address}

`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View on Explorer
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={disconnect}
                    className="text-destructive"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Disconnect
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={async () => {
                      if (address) {
                        const { optInMember } =
                          await import("@/lib/algorand/contract");
                        await optInMember(address);
                        alert("Opt-in successful!");
                      }
                    }}
                  >
                    Join Group (Test)
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={connect}
                disabled={isConnecting}
                className="gap-2"
              >
                {isConnecting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Wallet className="h-4 w-4" />
                )}
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border md:hidden">
          <div className="space-y-1 px-4 py-3">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-full justify-start gap-3"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                Toggle Theme
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
