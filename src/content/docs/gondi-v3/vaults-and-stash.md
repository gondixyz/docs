---
title: "Vaults & Stash"
---

## Vaults

Vaults allow users to bundle multiple assets and borrow against them as a single loan. The vault itself becomes an NFT that represents ownership of the bundled assets.

### What Can Go in Vaults

* **ERC-721 NFTs**: From any supported collection
* **ERC-1155 tokens**: From supported collections (see appendix for list)
* **ERC-20 tokens**: From supported collections (see appendix for list)
* **Mixed combinations**: Any combination of the above token types

### Vault Requirements

**ERC-1155 Support**: ERC-1155 tokens cannot be used as direct collateral and must be placed in vaults to receive loan offers.

**Legacy SuperRare Support**: Old SuperRare ERC-721 tokens must be wrapped using GONDI's "Stash" wrapper before use in vaults or individual loans.

### Creating and Managing Vaults

**Creation**: Anyone can mint a vault (requires gas fees)

* Add desired assets during creation
* No minimum or maximum asset limits
* Vault becomes an NFT representing the bundle

**Modification Restrictions**: Once created, vaults cannot be modified

* Cannot add new assets to existing vaults
* Cannot remove individual assets from vaults
* To change contents: repay any loans, burn vault, withdraw assets, create new vault

### Vault Loans

**Offer Process**: Lenders can see all assets within a vault when making offers

* Only item-specific offers available for vaults
* Collection offers do not apply to vaults
* Borrowers receive offers based on the entire vault's value

**Active Loan Restriction**: Vaults with active loans cannot be modified

* Must repay loan in full before making any changes
* Burning vault with active loan is not permitted

### Benefits of Vaults

* **Higher borrowing limits**: Combined asset value may qualify for larger loans
* **Better terms**: Bundled assets can attract more competitive offers
* **Simplified management**: One loan instead of multiple individual loans
* **Cost efficiency**: Fewer transactions and reduced gas fees
* **Flexibility**: Support for multiple token standards in one bundle

### Technical Notes

* Vault is an NFT that holds the bundled assets
* Buyers/bidders can inspect vault contents before purchase
* During liquidation, winners receive the vault NFT
