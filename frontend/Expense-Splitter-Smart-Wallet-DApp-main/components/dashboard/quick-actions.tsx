"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWallet } from "@/hooks/use-wallets";
import { Plus, UserPlus, ArrowLeftRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface QuickActionsProps {
  onCreateGroup: () => void;
  onJoinGroup: () => void;
}

export function QuickActions({
  onCreateGroup,
  onJoinGroup,
}: QuickActionsProps) {
  const { isConnected } = useWallet();
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [inviteCode, setInviteCode] = useState("");

  const handleCreateGroup = async () => {
    if (!groupName.trim()) return;
    setIsCreating(true);
    // Simulate transaction
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsCreating(false);
    setCreateDialogOpen(false);
    setGroupName("");
    router.push("/groups/new-group");
  };

  const handleJoinGroup = async () => {
    if (!inviteCode.trim()) return;
    setIsJoining(true);
    // Simulate transaction
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsJoining(false);
    setJoinDialogOpen(false);
    setInviteCode("");
    router.push("/groups");
  };

  if (!isConnected) return null;

  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create Group
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Group</DialogTitle>
                <DialogDescription>
                  Create a new expense group and invite your friends to join.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="group-name">Group Name</Label>
                  <Input
                    id="group-name"
                    placeholder="e.g., Trip to Bali"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setCreateDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateGroup}
                  disabled={isCreating || !groupName.trim()}
                >
                  {isCreating && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isCreating ? "Creating..." : "Create Group"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2 bg-transparent">
                <UserPlus className="h-4 w-4" />
                Join Group
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Join Existing Group</DialogTitle>
                <DialogDescription>
                  Enter the invite code shared by the group creator.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="invite-code">Invite Code</Label>
                  <Input
                    id="invite-code"
                    placeholder="e.g., ABC123"
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setJoinDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleJoinGroup}
                  disabled={isJoining || !inviteCode.trim()}
                >
                  {isJoining && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isJoining ? "Joining..." : "Join Group"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            className="gap-2 bg-transparent"
            onClick={() => router.push("/settlements")}
          >
            <ArrowLeftRight className="h-4 w-4" />
            View Settlements
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
