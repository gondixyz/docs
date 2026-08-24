---
title: "Protocol Contracts"
description: "Addresses of the GONDI smart contracts deployed on Ethereum, HyperEVM and Robinhood Chain."
---

All GONDI contracts are verified on the block explorer of each chain. The contracts that matter for most integrations are **Multi Source Loan** (loans), **Purchase Bundler** (trading, Sell & Repay) and the **Auction Loan Liquidator** (defaults).

:::caution
Only interact with the addresses listed here. GONDI never asks you to approve tokens or NFTs to any other contract.
:::

## Contract Overview

| Contract | Role |
| --- | --- |
| Multi Source Loan | Main contract of the protocol where loans are originated, refinanced, renegotiated and repaid. It keeps the collateral in escrow. |
| Purchase Bundler | Buys, sells and bids (including cross-currency and Sell & Repay) by bundling marketplace fills with loan actions. |
| Auction Loan Liquidator | Liquidation contract for defaulted loans, including buyouts and auctions. |
| Liquidation Distributor | Distributes auction proceeds pro-rata to the lenders of a liquidated loan. |
| Currency Manager | Manager of the ERC-20 tokens supported by GONDI. |
| Collection Manager | Manager of the collections whitelisted as collateral across all protocol versions. |
| Marketplace Manager | Manager of the marketplaces and methods the Purchase Bundler is allowed to call. |
| Price Quoter Manager / Price Quoter | Whitelist of price quoters and the Uniswap V3 TWAP quoter used for cross-currency conversions. |
| Range Validator | Validates collection offers across a range of token IDs, enabling collection offers for specific Art Blocks collections (Fidenzas, Chromie Squiggles, …). |
| Multi Address Validator | Validates collection offers that span several collection contracts. |
| User Vault | Factory of user vaults that bundle several NFTs (or ERC-1155s) into a single piece of collateral. |
| Stash | Wrapper that makes non-compliant ERC-721s (for example the original SuperRare contract) usable as collateral. |
| Position Migrator | Moves loans from older escrow contracts to the latest one via flash loan. |
| Fee Collector | Beneficiary of the protocol fees. |

## Ethereum

Chain ID `1` · Explorer: [etherscan.io](https://etherscan.io)

| Contract | Version | Address |
| --- | --- | --- |
| Multi Source Loan | V3.1 | [`0xf41B389E0C1950dc0B16C9498eaE77131CC08A56`](https://etherscan.io/address/0xf41B389E0C1950dc0B16C9498eaE77131CC08A56) |
| Multi Source Loan | V3.0 | [`0xf65b99ce6dc5f6c556172bcc0ff27d3665a7d9a8`](https://etherscan.io/address/0xf65b99ce6dc5f6c556172bcc0ff27d3665a7d9a8) |
| Multi Source Loan | V2 | [`0x478f6F994C6fb3cf3e444a489b3AD9edB8cCaE16`](https://etherscan.io/address/0x478f6F994C6fb3cf3e444a489b3AD9edB8cCaE16) |
| Multi Source Loan | V1 | [`0xCa5a494Ca20483e21ec1E41FE1D9461Da77595Bd`](https://etherscan.io/address/0xCa5a494Ca20483e21ec1E41FE1D9461Da77595Bd) |
| Purchase Bundler (Sell & Repay) | V3.1 | [`0xf46a58cada29ff34cf62f72357d2b37815506feb`](https://etherscan.io/address/0xf46a58cada29ff34cf62f72357d2b37815506feb) |
| Purchase Bundler (Sell & Repay) | V3.0 | [`0xcea7eea12c6fc82d0318704b9d35a4192c2d260a`](https://etherscan.io/address/0xcea7eea12c6fc82d0318704b9d35a4192c2d260a) |
| Purchase Bundler (Sell & Repay) | V2 | [`0x3b59bffe109e0f33f20887343759a98b48ecdf5f`](https://etherscan.io/address/0x3b59bffe109e0f33f20887343759a98b48ecdf5f) |
| Auction Loan Liquidator | V3 / V3.1 | [`0x2995AE7233fA89b314b5a707465B57a582F440F0`](https://etherscan.io/address/0x2995AE7233fA89b314b5a707465B57a582F440F0) |
| Auction Loan Liquidator | V2 | [`0x97D34635b605C2F1630D6b4c6C5D222B8a2ca47D`](https://etherscan.io/address/0x97D34635b605C2F1630D6b4c6C5D222B8a2ca47D) |
| Auction Loan Liquidator | V1 | [`0x237e4421C742d843Fdd96D22294D338507e17091`](https://etherscan.io/address/0x237e4421C742d843Fdd96D22294D338507e17091) |
| Liquidation Distributor | V2 | [`0xeDFbeE5E877EB02307e9c9e40be4E440e52f51C5`](https://etherscan.io/address/0xeDFbeE5E877EB02307e9c9e40be4E440e52f51C5) |
| Liquidation Distributor | V1 | [`0x6E9122DF87bFE08648aE4b77e97ce77D91b198Be`](https://etherscan.io/address/0x6E9122DF87bFE08648aE4b77e97ce77D91b198Be) |
| Currency Manager | V1, V2 & V3 | [`0x4150deD32A6D3bfecAE76e7558Af480190344927`](https://etherscan.io/address/0x4150deD32A6D3bfecAE76e7558Af480190344927) |
| Collection Manager | V1, V2 & V3 | [`0x52Ac424eF7B283aA5bADB8c6254832E3280d7398`](https://etherscan.io/address/0x52Ac424eF7B283aA5bADB8c6254832E3280d7398) |
| Marketplace Manager | V3 | [`0x4eCC15Ded6E2EB38cCE6B0bD0bb0E417813F8f09`](https://etherscan.io/address/0x4eCC15Ded6E2EB38cCE6B0bD0bb0E417813F8f09) |
| Price Quoter Manager | V3.1 | [`0xf0e9ecac11e9d319f3130a6be16f4d6b756e43af`](https://etherscan.io/address/0xf0e9ecac11e9d319f3130a6be16f4d6b756e43af) |
| Uniswap Price Quoter | V3.1 | [`0xCaD3b037b56cbD2B4CaE2B35B878894e541Af68a`](https://etherscan.io/address/0xCaD3b037b56cbD2B4CaE2B35B878894e541Af68a) |
| Range Validator | V3.1 | [`0x039BC1010f0295246d8004224600D65d804F2b0A`](https://etherscan.io/address/0x039BC1010f0295246d8004224600D65d804F2b0A) |
| Range Validator | V3 | [`0xAc9cD5FAB80c801D5d9F262B4E9f70B89d43a8b6`](https://etherscan.io/address/0xAc9cD5FAB80c801D5d9F262B4E9f70B89d43a8b6) |
| Range Validator | V2 | [`0x265a38D265599FEEBCF77A7e43D4837428d1fB00`](https://etherscan.io/address/0x265a38D265599FEEBCF77A7e43D4837428d1fB00) |
| Range Validator | V1 | [`0x18905fc7F3AaB462394F45B69308509a6b75573b`](https://etherscan.io/address/0x18905fc7F3AaB462394F45B69308509a6b75573b) |
| Multi Address Validator | V3.1 | [`0xDDCE55Af28FCD6C3F5C9A35D5a0aDa9c8f103aa0`](https://etherscan.io/address/0xDDCE55Af28FCD6C3F5C9A35D5a0aDa9c8f103aa0) |
| User Vault | V2 / V3 | [`0x823dE2c44369e94CAc3DA789Ad4b6493e27e4Bfe`](https://etherscan.io/address/0x823dE2c44369e94CAc3DA789Ad4b6493e27e4Bfe) |
| User Vault | V1 | [`0x14a6Dcebb2Bb73aae1b199CCAadA75247b81976D`](https://etherscan.io/address/0x14a6Dcebb2Bb73aae1b199CCAadA75247b81976D) |
| Stash (SuperRare wrapper) | Active since 12/05/2024 | [`0xc0ec4e4ba06dfb2dfaf21a69fc78310d80fc5497`](https://etherscan.io/address/0xc0ec4e4ba06dfb2dfaf21a69fc78310d80fc5497) |
| Stash (SuperRare wrapper) | Sunset once its loans are repaid | [`0xb14b3159785737ddbd0b5e9395394160b146e0b9`](https://etherscan.io/address/0xb14b3159785737ddbd0b5e9395394160b146e0b9) |
| Position Migrator | V3.1 | [`0xDCd85fEe491De4B1fc11CbC0Ba0e78537732f5b8`](https://etherscan.io/address/0xDCd85fEe491De4B1fc11CbC0Ba0e78537732f5b8) |
| Fee Collector | — | [`0x4169447a424ec645F8a24dCCFd8328f714Dd5562`](https://etherscan.io/address/0x4169447a424ec645F8a24dCCFd8328f714Dd5562) |

## HyperEVM

Chain ID `999` · Explorer: [hyperevmscan.io](https://hyperevmscan.io)

| Contract | Version | Address |
| --- | --- | --- |
| Multi Source Loan | V3.1 | [`0x6ad675624ec8320e5806858cd5db101a0b927fd9`](https://hyperevmscan.io/address/0x6ad675624ec8320e5806858cd5db101a0b927fd9) |
| Purchase Bundler (Sell & Repay) | V3.1 | [`0xFaaFf69dA43b8195E5B0945C4FeA4476e4264157`](https://hyperevmscan.io/address/0xFaaFf69dA43b8195E5B0945C4FeA4476e4264157) |
| Auction Loan Liquidator | V3.1 | [`0xB166Ec953FEf89C6ee2E39E60Fbd49b19Cf4c6ad`](https://hyperevmscan.io/address/0xB166Ec953FEf89C6ee2E39E60Fbd49b19Cf4c6ad) |
| Liquidation Distributor | V3.1 | [`0x47a297BcAdbe7c98991e3e7e3b7Cc0109Ace0a0C`](https://hyperevmscan.io/address/0x47a297BcAdbe7c98991e3e7e3b7Cc0109Ace0a0C) |
| Currency Manager | V3.1 | [`0xCa5a494Ca20483e21ec1E41FE1D9461Da77595Bd`](https://hyperevmscan.io/address/0xCa5a494Ca20483e21ec1E41FE1D9461Da77595Bd) |
| Collection Manager | V3.1 | [`0x18905fc7F3AaB462394F45B69308509a6b75573b`](https://hyperevmscan.io/address/0x18905fc7F3AaB462394F45B69308509a6b75573b) |
| Marketplace Manager | V3.1 | [`0x51dC8df5c17c2b7bD458fe758C2c322D739492fa`](https://hyperevmscan.io/address/0x51dC8df5c17c2b7bD458fe758C2c322D739492fa) |
| Range Validator | V3.1 | [`0x7545487a4749ab4a7c16f9185d574d5668220048`](https://hyperevmscan.io/address/0x7545487a4749ab4a7c16f9185d574d5668220048) |
| Multi Address Validator | V3.1 | [`0x7d60c8350267ff6d42741177056051d897cbb40e`](https://hyperevmscan.io/address/0x7d60c8350267ff6d42741177056051d897cbb40e) |
| User Vault | V2 / V3 | [`0x3f26ff30061d5a6777a01d7843b5f2b81f60a7ee`](https://hyperevmscan.io/address/0x3f26ff30061d5a6777a01d7843b5f2b81f60a7ee) |
| Loan Manager | V3.1 | [`0x97bA36bE389944f499495493A2246A96E55866D7`](https://hyperevmscan.io/address/0x97bA36bE389944f499495493A2246A96E55866D7) |
| Fee Collector | — | [`0xBc0b9C63dC0581278d4b554AF56858298BF2a9eC`](https://hyperevmscan.io/address/0xBc0b9C63dC0581278d4b554AF56858298BF2a9eC) |

## Robinhood Chain

Chain ID `4663` · Explorer: [robinhoodchain.blockscout.com](https://robinhoodchain.blockscout.com)

| Contract | Version | Address |
| --- | --- | --- |
| Multi Source Loan | V3.1 | [`0x0e79e08e9E35388382b7FebB26Bc73F80465e2fB`](https://robinhoodchain.blockscout.com/address/0x0e79e08e9E35388382b7FebB26Bc73F80465e2fB) |
| Purchase Bundler (Sell & Repay) | V3.1 | [`0xfa13dfde6fdf37A2CB4151195f95940285F70754`](https://robinhoodchain.blockscout.com/address/0xfa13dfde6fdf37A2CB4151195f95940285F70754) |
| Auction Loan Liquidator | V3.1 | [`0xF4b2c5735247c74F40D7505EF2B5bA368651A5C8`](https://robinhoodchain.blockscout.com/address/0xF4b2c5735247c74F40D7505EF2B5bA368651A5C8) |
| Liquidation Distributor | V3.1 | [`0xe01D2Ae2CC3E1Ba15f30EFD1E8b79Ba59095f3A1`](https://robinhoodchain.blockscout.com/address/0xe01D2Ae2CC3E1Ba15f30EFD1E8b79Ba59095f3A1) |
| Currency Manager | V3.1 | [`0xaE8880e97dF12C1Ab7604a7322D50C3bB7b82468`](https://robinhoodchain.blockscout.com/address/0xaE8880e97dF12C1Ab7604a7322D50C3bB7b82468) |
| Collection Manager | V3.1 | [`0x22d4fA839F49ed7E68CA552873Ad1F65d1ce9941`](https://robinhoodchain.blockscout.com/address/0x22d4fA839F49ed7E68CA552873Ad1F65d1ce9941) |
| Marketplace Manager | V3.1 | [`0x3C9722071E30cd41F3555063f7317FC0f8D71c64`](https://robinhoodchain.blockscout.com/address/0x3C9722071E30cd41F3555063f7317FC0f8D71c64) |
| Price Quoter Manager | V3.1 | [`0x8658958b3F08311Ea4E0469B25d8d3b62307A706`](https://robinhoodchain.blockscout.com/address/0x8658958b3F08311Ea4E0469B25d8d3b62307A706) |
| Uniswap Price Quoter | V3.1 | [`0x759da3412893D1a627ef5aFCad53b191A254243a`](https://robinhoodchain.blockscout.com/address/0x759da3412893D1a627ef5aFCad53b191A254243a) |
| Range Validator | V3.1 | [`0x00c361f94f170B3239c8F3ed68d7915C0C43de4C`](https://robinhoodchain.blockscout.com/address/0x00c361f94f170B3239c8F3ed68d7915C0C43de4C) |
| Multi Address Validator | V3.1 | [`0xB81a14cE55Fbc5B40bcB3D8F9086f0DD219eaFc5`](https://robinhoodchain.blockscout.com/address/0xB81a14cE55Fbc5B40bcB3D8F9086f0DD219eaFc5) |
| User Vault | V2 / V3 | [`0xcf0DF26aE14D132084E95EE8a9426d53eb027cb7`](https://robinhoodchain.blockscout.com/address/0xcf0DF26aE14D132084E95EE8a9426d53eb027cb7) |
| Loan Manager Registry | V3.1 | [`0x342dFE0756a452714Fd07819a63e64f43F4505F0`](https://robinhoodchain.blockscout.com/address/0x342dFE0756a452714Fd07819a63e64f43F4505F0) |
| Fee Collector | — | [`0xf9b6B3dD83f2d046Ef028CBB2c5E91B33aaf2cd3`](https://robinhoodchain.blockscout.com/address/0xf9b6B3dD83f2d046Ef028CBB2c5E91B33aaf2cd3) |

## Source Code

The protocol contracts are open source: [github.com/gondixyz/florida-contracts](https://github.com/gondixyz/florida-contracts). The TypeScript SDK lives at [github.com/gondixyz/gondi-js](https://github.com/gondixyz/gondi-js).
