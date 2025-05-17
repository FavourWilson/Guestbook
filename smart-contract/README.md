# 📘 Arbitrum Guestbook Smart Contract

A simple on-chain guestbook built on **Arbitrum Sepolia** testnet.

Users can sign the guestbook by submitting their name and message, which are stored publicly on the blockchain.

---

## 🚀 Overview

This project is part of the **Arbitrum Hackathon Beginner Series** to help developers quickly get started building on Arbitrum.

### Features:
- Users can submit a message and their name
- All entries are stored on-chain
- Anyone can view all previous guestbook entries

---

## 🛠️ Tech Stack

- **Solidity** for smart contract
- **Hardhat** for development & testing
- **Arbitrum Sepolia Testnet**
- **Ethers.js**, **MetaMask**, **TailwindCSS**, **HTML/JS** for frontend (in separate repo)

---

## 📄 Smart Contract

### `Guestbook.sol`

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Guestbook {
    struct Entry {
        string name;
        string message;
        uint256 timestamp;
    }

    Entry[] public entries;

    function sign(string memory _name, string memory _message) public {
        entries.push(Entry(_name, _message, block.timestamp));
    }

    function getAllEntries() public view returns (Entry[] memory) {
        return entries;
    }
}
```



  ## How to Deploy
**1. Clone the repo:**

```
git clone https://github.com/FavourWilson/Guestbook.git
cd Guestbook
```

**2. Install dependencies:**
```
npm install
```
**3. Compile the contract:**
```
npx hardhat compile
```

**4. Deploy to Arbitrum Sepolia:**
```
npx hardhat run scripts/deploy.js --network arbitrumSepolia
```


