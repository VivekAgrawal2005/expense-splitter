// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ExpenseManager is ReentrancyGuard, Ownable {

    /*//////////////////////////////////////////////////////////////
                                TYPES
    //////////////////////////////////////////////////////////////*/
    constructor() Ownable(msg.sender){

    } // Initialize Ownable with deployer as owner

    enum ExpenseStatus {
        CREATED,
        APPROVED,
        DISPUTED
    }

    struct Group {
        address creator;
        address[] members;
        mapping(address => bool) isMember;
        bool active;
    }

    struct Expense {
        address payer;
        uint256 amount;                  // net amount paid
        address[] participants;
        uint256[] shares;
        bytes32 receiptHash;
        ExpenseStatus status;
    }

    /*//////////////////////////////////////////////////////////////
                                STORAGE
    //////////////////////////////////////////////////////////////*/

    uint256 private groupCounter;

    mapping(uint256 => Group) private groups;
    mapping(uint256 => mapping(address => int256)) public balances;

    // groupId => expenses
    mapping(uint256 => Expense[]) public expenses;

    // groupId => expenseId => participant => approved?
    mapping(uint256 => mapping(uint256 => mapping(address => bool))) public approvals;

    /*//////////////////////////////////////////////////////////////
                                EVENTS
    //////////////////////////////////////////////////////////////*/

    event GroupCreated(uint256 indexed groupId, address indexed creator);
    event MemberAdded(uint256 indexed groupId, address member);

    event ExpenseCreated(uint256 indexed groupId, uint256 indexed expenseId);
    event ExpenseApproved(uint256 indexed groupId, uint256 indexed expenseId);
    event ExpenseDisputed(uint256 indexed groupId, uint256 indexed expenseId);
    event ExpenseEdited(uint256 indexed groupId, uint256 indexed expenseId);

    event Settled(
        uint256 indexed groupId,
        address indexed from,
        address indexed to,
        uint256 amount
    );

    /*//////////////////////////////////////////////////////////////
                                MODIFIERS
    //////////////////////////////////////////////////////////////*/

    modifier groupExists(uint256 groupId) {
        require(groups[groupId].active, "Group does not exist");
        _;
    }

    modifier onlyMember(uint256 groupId) {
        require(groups[groupId].isMember[msg.sender], "Not group member");
        _;
    }

    /*//////////////////////////////////////////////////////////////
                            GROUP MANAGEMENT
    //////////////////////////////////////////////////////////////*/

    function createGroup(address[] calldata members)
        external
        returns (uint256 groupId)
    {
        require(members.length > 0, "No members");

        groupId = ++groupCounter;
        Group storage g = groups[groupId];
        g.creator = msg.sender;
        g.active = true;

        g.members.push(msg.sender);
        g.isMember[msg.sender] = true;

        for (uint256 i = 0; i < members.length; i++) {
            address m = members[i];
            require(m != address(0), "Invalid member");
            require(!g.isMember[m], "Duplicate");

            g.members.push(m);
            g.isMember[m] = true;
        }

        emit GroupCreated(groupId, msg.sender);
    }

    function addMember(uint256 groupId, address member)
        external
        groupExists(groupId)
    {
        Group storage g = groups[groupId];
        require(msg.sender == g.creator, "Only creator");
        require(!g.isMember[member], "Already member");

        g.members.push(member);
        g.isMember[member] = true;

        emit MemberAdded(groupId, member);
    }

    /*//////////////////////////////////////////////////////////////
                            EXPENSE CREATION
    //////////////////////////////////////////////////////////////*/

    function addExpense(
        uint256 groupId,
        uint256 amount,
        address[] calldata participants,
        uint256[] calldata shares,
        bytes32 receiptHash
    )
        external
        groupExists(groupId)
        onlyMember(groupId)
    {
        require(amount > 0, "Invalid amount");
        require(participants.length == shares.length, "Length mismatch");

        uint256 total;
        for (uint256 i = 0; i < shares.length; i++) {
            require(groups[groupId].isMember[participants[i]], "Not member");
            total += shares[i];
        }
        require(total == amount, "Invalid split");

        expenses[groupId].push(
            Expense({
                payer: msg.sender,
                amount: amount,
                participants: participants,
                shares: shares,
                receiptHash: receiptHash,
                status: ExpenseStatus.CREATED
            })
        );

        emit ExpenseCreated(groupId, expenses[groupId].length - 1);
    }

    /*//////////////////////////////////////////////////////////////
                        EXPENSE APPROVAL / DISPUTE
    //////////////////////////////////////////////////////////////*/

    function approveExpense(uint256 groupId, uint256 expenseId)
        external
        groupExists(groupId)
        onlyMember(groupId)
    {
        Expense storage e = expenses[groupId][expenseId];
        require(e.status == ExpenseStatus.CREATED, "Not approvable");

        approvals[groupId][expenseId][msg.sender] = true;

        // Check unanimous approval
        for (uint256 i = 0; i < e.participants.length; i++) {
            if (!approvals[groupId][expenseId][e.participants[i]]) {
                return;
            }
        }

        // Apply balances only once
        for (uint256 i = 0; i < e.participants.length; i++) {
            address user = e.participants[i];
            uint256 share = e.shares[i];

            if (user != e.payer) {
                balances[groupId][user] -= int256(share);
                balances[groupId][e.payer] += int256(share);
            }
        }

        e.status = ExpenseStatus.APPROVED;
        emit ExpenseApproved(groupId, expenseId);
    }

    function disputeExpense(uint256 groupId, uint256 expenseId)
        external
        groupExists(groupId)
        onlyMember(groupId)
    {
        Expense storage e = expenses[groupId][expenseId];
        require(e.status == ExpenseStatus.CREATED, "Cannot dispute");

        e.status = ExpenseStatus.DISPUTED;
        emit ExpenseDisputed(groupId, expenseId);
    }

    function editDisputedExpense(
        uint256 groupId,
        uint256 expenseId,
        uint256 newAmount,
        uint256[] calldata newShares,
        bytes32 newReceiptHash
    ) external {
        Expense storage e = expenses[groupId][expenseId];

        require(e.status == ExpenseStatus.DISPUTED, "Not disputed");
        require(msg.sender == e.payer, "Only payer");
        require(newShares.length == e.participants.length, "Length mismatch");

        uint256 total;
        for (uint256 i = 0; i < newShares.length; i++) {
            total += newShares[i];
        }
        require(total == newAmount, "Invalid split");

        e.amount = newAmount;
        e.shares = newShares;
        e.receiptHash = newReceiptHash;
        e.status = ExpenseStatus.CREATED;

        // Reset approvals
        for (uint256 i = 0; i < e.participants.length; i++) {
            approvals[groupId][expenseId][e.participants[i]] = false;
        }

        emit ExpenseEdited(groupId, expenseId);
    }

    /*//////////////////////////////////////////////////////////////
                            SETTLEMENT
    //////////////////////////////////////////////////////////////*/

    function settle(uint256 groupId, address to)
    external
    payable
    groupExists(groupId)
    onlyMember(groupId)
    nonReentrant
{
    require(to != address(0) && to != msg.sender, "Invalid");

    int256 debt = balances[groupId][msg.sender];
    require(debt < 0, "No debt");

    uint256 amount = msg.value;
    uint256 maxPayable = uint256(-debt);
    uint256 pay = amount > maxPayable ? maxPayable : amount;
    require(pay > 0, "Zero payment");

    balances[groupId][msg.sender] += int256(pay);
    balances[groupId][to] -= int256(pay);

    (bool success, ) = payable(to).call{value: pay}("");
    require(success, "Transfer failed");

    // Fixed: Check refund success
    if (amount > pay) {
        (bool refundSuccess, ) = payable(msg.sender).call{value: amount - pay}("");
        require(refundSuccess, "Refund failed");
    }

    emit Settled(groupId, msg.sender, to, pay);
}

    function batchSettle(
        uint256 groupId,
        address[] calldata from,
        address[] calldata to,
        uint256[] calldata amounts
    )
        external
        payable
        onlyOwner   // relayer
        groupExists(groupId)
        nonReentrant
    {
        require(
            from.length == to.length && to.length == amounts.length,
            "Length mismatch"
        );

        uint256 total;

        // EFFECTS
        for (uint256 i = 0; i < amounts.length; i++) {
            require(from[i] != to[i], "Self");

            int256 fBal = balances[groupId][from[i]];
            int256 tBal = balances[groupId][to[i]];

            require(fBal < 0 && tBal > 0, "Invalid balances");
            require(uint256(-fBal) >= amounts[i], "Debt low");
            require(uint256(tBal) >= amounts[i], "Credit low");

            balances[groupId][from[i]] += int256(amounts[i]);
            balances[groupId][to[i]] -= int256(amounts[i]);

            total += amounts[i];
        }

        require(total == msg.value, "ETH mismatch");

        // INTERACTIONS
        for (uint256 i = 0; i < amounts.length; i++) {
            (bool ok, ) = payable(to[i]).call{value: amounts[i]}("");
            require(ok, "Transfer failed");

            emit Settled(groupId, from[i], to[i], amounts[i]);
        }
    }

    /*//////////////////////////////////////////////////////////////
                        SAFETY & RESCUE
    //////////////////////////////////////////////////////////////*/

    function emergencyWithdraw(address to, uint256 amount)
        external
        onlyOwner
    {
        require(to != address(0), "Invalid");
        (bool success, ) = payable(to).call{value: amount}("");
        require(success, "Transfer failed");
    }
}
