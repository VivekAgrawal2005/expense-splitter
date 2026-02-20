// "use client"

// import Link from "next/link"
// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Input } from "@/components/ui/input"
// import { useWallet } from "@/components/wagmi-provider"
// import { Users, AlertCircle, CheckCircle2, Clock, Plus, Search, ArrowRight } from "lucide-react"
// import { useState } from "react"

// const mockGroups = [
//   {
//     id: "1",
//     name: "Trip to Bali",
//     members: 5,
//     balance: "$1,250.00",
//     pendingExpenses: 2,
//     status: "active",
//     yourBalance: "+$215.50",
//     yourBalanceType: "owed",
//     createdAt: "Dec 10, 2024",
//   },
//   {
//     id: "2",
//     name: "Monthly Rent",
//     members: 3,
//     balance: "$3,200.00",
//     pendingExpenses: 0,
//     status: "settled",
//     yourBalance: "$0.00",
//     yourBalanceType: "settled",
//     createdAt: "Nov 1, 2024",
//   },
//   {
//     id: "3",
//     name: "Weekend Camping",
//     members: 8,
//     balance: "$485.00",
//     pendingExpenses: 1,
//     status: "dispute",
//     yourBalance: "-$127.00",
//     yourBalanceType: "owes",
//     createdAt: "Dec 5, 2024",
//   },
//   {
//     id: "4",
//     name: "Office Lunch Club",
//     members: 12,
//     balance: "$89.50",
//     pendingExpenses: 0,
//     status: "active",
//     yourBalance: "+$12.00",
//     yourBalanceType: "owed",
//     createdAt: "Oct 15, 2024",
//   },
// ]

// export function GroupsListContent() {
//   const { isConnected } = useWallet()
//   const [searchQuery, setSearchQuery] = useState("")

//   const filteredGroups = mockGroups.filter((group) => group.name.toLowerCase().includes(searchQuery.toLowerCase()))

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Groups</h1>
//           <p className="mt-1 text-muted-foreground">Manage your expense groups</p>
//         </div>
//         <Button className="gap-2">
//           <Plus className="h-4 w-4" />
//           Create Group
//         </Button>
//       </div>

//       {isConnected && (
//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//           <Input
//             placeholder="Search groups..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="pl-9"
//           />
//         </div>
//       )}

//       {!isConnected ? (
//         <Card className="border-border">
//           <CardContent className="flex flex-col items-center justify-center py-12 text-center">
//             <Users className="mb-4 h-12 w-12 text-muted-foreground" />
//             <h3 className="text-lg font-semibold text-foreground">Connect to View Groups</h3>
//             <p className="mt-2 max-w-sm text-sm text-muted-foreground">
//               Connect your wallet to view and manage your expense groups.
//             </p>
//           </CardContent>
//         </Card>
//       ) : (
//         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//           {filteredGroups.map((group) => (
//             <Link key={group.id} href={`/groups/${group.id}`}>
//               <Card className="group h-full border-border transition-all hover:border-primary/50 hover:shadow-md">
//                 <CardContent className="p-5">
//                   <div className="flex items-start justify-between">
//                     <div>
//                       <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">
//                         {group.name}
//                       </h3>
//                       <p className="mt-0.5 text-xs text-muted-foreground">Created {group.createdAt}</p>
//                     </div>
//                     <StatusBadge status={group.status} pending={group.pendingExpenses} />
//                   </div>

//                   <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
//                     <Users className="h-4 w-4" />
//                     {group.members} members
//                   </div>

//                   <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
//                     <div>
//                       <p className="text-xs text-muted-foreground">Pooled</p>
//                       <p className="font-semibold text-card-foreground">{group.balance}</p>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-xs text-muted-foreground">You</p>
//                       <p
//                         className={`font-semibold ${
//                           group.yourBalanceType === "owed"
//                             ? "text-success"
//                             : group.yourBalanceType === "owes"
//                               ? "text-destructive"
//                               : "text-muted-foreground"
//                         }`}
//                       >
//                         {group.yourBalance}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="mt-4 flex items-center justify-end text-sm text-primary">
//                     View Details
//                     <ArrowRight className="ml-1 h-4 w-4" />
//                   </div>
//                 </CardContent>
//               </Card>
//             </Link>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }

// function StatusBadge({ status, pending }: { status: string; pending: number }) {
//   if (status === "dispute") {
//     return (
//       <Badge variant="destructive" className="gap-1">
//         <AlertCircle className="h-3 w-3" />
//         Dispute
//       </Badge>
//     )
//   }

//   if (pending > 0) {
//     return (
//       <Badge variant="secondary" className="gap-1 bg-warning/10 text-warning">
//         <Clock className="h-3 w-3" />
//         {pending} Pending
//       </Badge>
//     )
//   }

//   if (status === "settled") {
//     return (
//       <Badge variant="secondary" className="gap-1 bg-success/10 text-success">
//         <CheckCircle2 className="h-3 w-3" />
//         Settled
//       </Badge>
//     )
//   }

//   return (
//     <Badge variant="secondary" className="gap-1 bg-primary/10 text-primary">
//       Active
//     </Badge>
//   )
// }

"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useWallet } from "@/hooks/use-wallets";
import { useEffect, useState } from "react";
import { indexerClient } from "@/lib/algorand/client";

import { Users, AlertCircle, CheckCircle2, Clock } from "lucide-react";

export function GroupsListContent() {
  const { account } = useWallet();
  const isConnected = !!account;

  const [searchQuery, setSearchQuery] = useState("");
  const [groups, setGroups] = useState<any[]>([]);
  const [groupId, setGroupId] = useState("");
  const [joining, setJoining] = useState(false);

  // ⭐ FETCH GROUPS FROM INDEXER
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const joined = JSON.parse(localStorage.getItem("joinedGroups") || "[]");

        const formatted = joined.map((id: string) => ({
          id,
          name: `Group #${id}`,
          members: 0,
          balance: "0 ALGO",
          pendingExpenses: 0,
          status: "active",
          yourBalance: "0",
          yourBalanceType: "settled",
          createdAt: "On-chain",
        }));

        setGroups(formatted);
      } catch (err) {
        console.error(err);
      }
    };

    fetchGroups();
  }, []);

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  async function handleJoinGroup() {
    if (!account) return;

    try {
      setJoining(true);

      const { optInMember } = await import("@/lib/algorand/contract");

      await optInMember(account);

      const existing = JSON.parse(localStorage.getItem("joinedGroups") || "[]");

      if (!existing.includes(groupId)) {
        existing.push(groupId);
        localStorage.setItem("joinedGroups", JSON.stringify(existing));
      }

      alert("Joined group successfully!");
    } catch (err) {
      console.error(err);
      alert("Join failed");
    } finally {
      setJoining(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Groups</h1>
      </div>

      {/* JOIN GROUP CARD */}
      {isConnected && (
        <Card>
          <CardContent className="p-4 space-y-3">
            <p className="font-semibold">Join Group</p>

            <Input
              placeholder="Enter Group App ID"
              value={groupId}
              onChange={(e) => setGroupId(e.target.value)}
            />

            <Button onClick={handleJoinGroup} disabled={joining}>
              {joining ? "Joining..." : "Join Group"}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* NOT CONNECTED */}
      {!isConnected ? (
        <Card>
          <CardContent className="py-10 text-center">
            Connect wallet to view groups
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredGroups.map((group) => (
            <Link key={group.id} href={`/groups/${group.id}`}>
              <Card className="hover:shadow-md transition">
                <CardContent className="p-5">
                  <h3 className="font-semibold">{group.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {group.members} members
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status, pending }: { status: string; pending: number }) {
  if (status === "dispute") {
    return (
      <Badge variant="destructive">
        <AlertCircle className="h-3 w-3 mr-1" />
        Dispute
      </Badge>
    );
  }

  if (pending > 0) {
    return (
      <Badge>
        <Clock className="h-3 w-3 mr-1" />
        Pending
      </Badge>
    );
  }

  return (
    <Badge>
      <CheckCircle2 className="h-3 w-3 mr-1" />
      Active
    </Badge>
  );
}
