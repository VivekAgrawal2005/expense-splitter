# from beaker import *
# from pyteal import *


# class ExpenseSplitterState:
#     group_name = GlobalStateValue(
#         stack_type=TealType.bytes,
#         descr="Name of the group"
#     )

#     creator = GlobalStateValue(
#         stack_type=TealType.bytes,
#         descr="Creator address"
#     )

#     member_count = GlobalStateValue(
#         stack_type=TealType.uint64,
#         descr="Number of members"
#     )

#     # Local state per user
#     net_balance = LocalStateValue(
#         stack_type=TealType.int,
#         descr="Net balance of member"
#     )


# app = Application(
#     "ExpenseSplitter",
#     state=ExpenseSplitterState()
# )


# @app.create
# def create(group_name: abi.String):
#     return Seq(
#         app.state.group_name.set(group_name.get()),
#         app.state.creator.set(Txn.sender()),
#         app.state.member_count.set(Int(0)),
#         Approve()
#     )


# @app.opt_in
# def opt_in():
#     return Seq(
#         app.state.net_balance.set(Int(0)),
#         app.state.member_count.set(
#             app.state.member_count.get() + Int(1)
#         ),
#         Approve()
#     )


# @app.external
# def update_balance(member: abi.Account, amount: abi.Int64):
#     """
#     amount can be positive or negative.
#     """
#     return Seq(
#         app.state.net_balance[member.address()].set(
#             app.state.net_balance[member.address()].get() + amount.get()
#         ),
#         Approve()
#     )


# @app.external(read_only=True)
# def get_balance(member: abi.Account, *, output: abi.Int64):
#     return Seq(
#         output.set(app.state.net_balance[member.address()].get()),
#         Approve()
#     )


# @app.external
# def settle(amount: abi.Int64):
#     """
#     User settles their own debt.
#     """
#     return Seq(
#         app.state.net_balance.set(
#             app.state.net_balance.get() - amount.get()
#         ),
#         Approve()
#     )

from algopy import ARC4Contract, arc4, UInt64, String, GlobalState


class ExpenseSplitterContract(ARC4Contract):

    group_name = GlobalState(String)
    member_count = GlobalState(UInt64)
    balance = GlobalState(UInt64)

    @arc4.abimethod(create="require")
    def create(self, group_name: String) -> None:
        self.group_name.value = group_name
        self.member_count.value = UInt64(0)
        self.balance.value = UInt64(0)

    @arc4.abimethod
    @arc4.abimethod
    def opt_in_member(self) -> None:
        self.member_count = self.member_count + UInt64(1)


    @arc4.abimethod
    def update_balance(self, amount: UInt64) -> None:
        self.balance.value = amount

    @arc4.abimethod(readonly=True)
    def get_balance(self) -> UInt64:
        return self.balance.value

    @arc4.abimethod(readonly=True)
    def get_group_name(self) -> String:
        return self.group_name

