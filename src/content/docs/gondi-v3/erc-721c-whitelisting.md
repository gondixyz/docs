---
title: "ERC-721C Whitelisting"
---

ERC-721C collections enforce creator royalties by restricting which contracts can move their tokens. For an ERC-721C collection to work on GONDI, the collection owner must whitelist the GONDI contracts that touch the NFT during the loan lifecycle. Transfers from non-whitelisted contracts are rejected onchain.

## Contracts To Whitelist

Every ERC-721C collection that wants full GONDI support needs to whitelist all contracts below. Partial whitelisting is possible, but flows that rely on a non-whitelisted contract will revert.

* **MultiSourceLoan 3.2:** `0xE365fF3cad44d19cb7aBa81df8ffd6818A66Ac0a` — starting and repaying private loans
* **MultiSourceLoan 3.1:** `0xf41B389E0C1950dc0B16C9498eaE77131CC08A56` — starting and repaying loans
* **MultiSourceLoan 3.0:** `0xf65b99ce6dc5f6c556172bcc0ff27d3665a7d9a8` — repaying legacy 3.0 loans
* **PurchaseBundler 3.2 (cross-currency):** `0x2B5E66c44B223b9D3B192e697F58795febCd6C10` — buy-with-loan and sell-and-repay for private loans
* **PurchaseBundler 3.1 (cross-currency):** `0xf46a58cada29ff34cf62f72357d2b37815506feb` — sell-and-repay for legacy 3.1 loans
* **Auction Loan Liquidator 3.2:** `0xe6Ef33216348dDb2303a19Bb970e83d6508FabA5` — required to proceed when there is an auction in private loans
* **Auction Loan Liquidator 3.1:** `0x2995ae7233fa89b314b5a707465b57a582f440f0` — required to proceed when there is an auction in loans
* **Seaport 1.6:** `0x0000000000000068f116a894984e2db1123eb395` — sales, buy-with-loan, and sell-and-repay
* **Vault:** `0x823dE2c44369e94CAc3DA789Ad4b6493e27e4Bfe` — creating vaults that bundle multiple NFTs into one loan

Note: Addresses are Ethereum mainnet. For other chains check the protocol contracts.

## Applying the Whitelist

Exact steps depend on the transfer validator your collection uses (for example, Limit Break's Creator Token Transfer Validator).

* Open the transfer validator contract used by your collection
* Add each address above to your collection's operator allowlist
* Confirm the collection's security level consults the operator allowlist

## Verifying

* Read the operator allowlist and confirm all addresses are present
* Take out and repay a small loan, and run a buy-with-loan and sell-and-repay if applicable — any revert usually means a missing whitelist entry
