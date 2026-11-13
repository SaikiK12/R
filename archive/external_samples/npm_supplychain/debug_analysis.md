# Analysis of Malicious Cryptocurrency-Draining Script

This is a **highly malicious cryptocurrency-draining script**. 🚨 Its purpose is to steal cryptocurrency from users who visit a website that has this code running. This type of malware is often hidden within compromised npm packages, leading to a "supply chain attack" where developers unknowingly include the malicious code in their applications.

The code is heavily obfuscated (intentionally made difficult to read) to hide its true purpose.

---

## How It Works

The script employs two primary methods to steal funds: **Address Swapping** and **Transaction Hijacking**.

### 1. Address Swapping (Find and Replace)

This is the broadest part of the attack. The script hijacks the browser's core communication functions, `fetch` and `XMLHttpRequest`, which are used to load and send data from a website.

* **Interception**: It intercepts all incoming and outgoing web traffic from the user's browser for that specific website.
* **Scanning**: It scans the text and data of the website for anything that looks like a cryptocurrency address. It has patterns (regular expressions) to detect addresses for a wide variety of blockchains, including:
    * Bitcoin (Legacy and Segwit)
    * Ethereum
    * Solana
    * Tron
    * Litecoin
    * Bitcoin Cash
* **Replacement**: When it finds a legitimate address, it swaps it with a similar-looking address from a massive hardcoded list belonging to the attacker. For example, if a user tries to copy an address to send funds to, this script could replace that address on the webpage itself with an attacker's address. The user might then unknowingly send their funds to the thief.

### 2. Transaction Hijacking (Active Theft)

This is a more direct and aggressive attack that targets users with browser wallets like MetaMask.

* **Wallet Hooking**: The script detects if a user has an Ethereum wallet (`window.ethereum`) installed. It then wraps the wallet's core functions, such as `request`, `send`, and `sendAsync`.
* **Transaction Modification**: When a user initiates a transaction (e.g., sending ETH, swapping tokens on Uniswap, or approving a token for use on a DeFi platform), the script intercepts the transaction *before* it is sent to the wallet for confirmation.
* **Fund Redirection**: It rewrites the transaction details in the background.
    * For simple transfers, it changes the recipient's address to the attacker's address: `0xFc4a4858bafef54D1b1d7697bfb5c52F4c166976`.
    * For more complex interactions, like token approvals (`approve`) or transfers (`transferFrom`), it modifies the transaction data to grant the attacker control over the user's tokens or send them directly to the attacker's wallet.

Essentially, what the user sees on the website's front end is not what the wallet is actually asked to sign. Unless the user is extremely careful and inspects the raw transaction details in their wallet pop-up, they will be tricked into signing a transaction that sends their funds or tokens to the attacker.

---

## Scope and Severity

* **Severity**: **Critical**. Any user interacting with a compromised website using a browser-based crypto wallet is at immediate risk of having their funds stolen. The script is designed to bypass user confirmation by manipulating the data *before* it is presented to the user for the final signature.
* **Scope**: The vulnerability affects **end-users** of any web application that has inadvertently included the malicious npm package as a dependency. It's not a vulnerability in the wallet software itself, but rather a script that deceives the user into authorizing malicious transactions.

---

## Recommendations

* **For Developers**: If this package is a dependency in your project, **remove it immediately**. Audit all other dependencies for suspicious code. It's crucial to use tools like `npm audit` and services that scan for known vulnerabilities. Pin dependencies to specific versions using a lock file (`package-lock.json`) to prevent malicious updates from being automatically included.
* **For End-Users**: The best defense is vigilance. **Always double-check transaction details** in your wallet's confirmation window before signing, especially the destination address and the smart contract being interacted with. Using a hardware wallet adds a significant layer of security, as the transaction details must be verified on a separate physical device that the malware cannot infect.