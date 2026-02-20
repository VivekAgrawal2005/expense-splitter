"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useWallet } from "@/components/wagmi-provider"
import { useTheme } from "next-themes"
import { User, Copy, ExternalLink, Moon, Sun, Bell, Shield, LogOut } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function ProfileContent() {
  const { toast } = useToast()
  const { isConnected, address, disconnect } = useWallet()
  const { theme, setTheme } = useTheme()

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      toast({ title: "Copied!", description: "Address copied to clipboard" })
    }
  }

  if (!isConnected) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Profile</h1>
          <p className="mt-1 text-muted-foreground">Manage your account settings</p>
        </div>

        <Card className="border-border">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <User className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-semibold text-foreground">Connect to View Profile</h3>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Connect your wallet to view and manage your profile settings.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Profile</h1>
        <p className="mt-1 text-muted-foreground">Manage your account settings</p>
      </div>

      {/* Account Info */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Account</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary/10 text-xl text-primary">
                {address?.slice(2, 4).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-mono text-lg font-medium text-foreground">{address}</p>
              <div className="mt-2 flex gap-2">
                <Button variant="outline" size="sm" className="gap-2 bg-transparent" onClick={copyAddress}>
                  <Copy className="h-4 w-4" />
                  Copy
                </Button>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent" asChild>
                  <a href={`https://polygonscan.com/address/${address}`} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    View on Explorer
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div className="flex items-center gap-3">
              {theme === "dark" ? (
                <Moon className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Sun className="h-5 w-5 text-muted-foreground" />
              )}
              <div>
                <Label className="font-medium">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">Toggle dark theme</p>
              </div>
            </div>
            <Switch checked={theme === "dark"} onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")} />
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <div>
                <Label className="font-medium">Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive expense alerts</p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Security</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <div>
                <Label className="font-medium">Connected Network</Label>
                <p className="text-sm text-muted-foreground">Polygon Mainnet</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-success" />
              <span className="text-sm text-success">Connected</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disconnect */}
      <Card className="border-border border-destructive/50">
        <CardContent className="pt-6">
          <Button variant="destructive" className="w-full gap-2" onClick={disconnect}>
            <LogOut className="h-4 w-4" />
            Disconnect Wallet
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
