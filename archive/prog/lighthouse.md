# Lighthouse Program — Identification and Correction

**Program:** `L2TExMFKdjpN9kozasaurPirfHy9P8sbXoAN1qA3S95`

This note corrects an initial misattribution from the 2026-11-12 evening
session, where this program was logged as possible operator infrastructure.
On-chain evidence confirms it is **Lighthouse**, the open-source Solana
assertion protocol ([github.com/Jac0xb/lighthouse](https://github.com/Jac0xb/lighthouse),
MIT license).

---

## On-Chain Facts

| Property | Value |
|---|---|
| Program address | `L2TExMFKdjpN9kozasaurPirfHy9P8sbXoAN1qA3S95` |
| Identity | Lighthouse — open-source Solana assertion protocol |
| Deployed | Slot 294,179,293 (~mid-2024), immutable (no upgrade authority) |
| Program data | `CJ5WEjifs4d77pEA9DpewppByFjHcAkNv3YYSuSoDk7c` (424,293 bytes) |
| ELF SHA-256 | `a89179ae024ac36aa5fc308251caa84cd0a3390ae66d8523514004a86d5148bb` |
| Embedded pubkeys | SystemProgram, Tokenkeg, Token-2022, Stake, BPFLoaderUpgradeable |
| Daily usage | 4,000+ signatures/day — ecosystem-wide, not campaign-specific |

The ELF is kept in this directory as `lighthouse.elf` (public on-chain data).

---

## Why a Campaign Transaction Called It

Lighthouse appends assertion instructions to transactions: a wallet simulates
the expected post-transaction state and asserts it at runtime. A failed
assertion aborts the whole transaction.

The decoded transaction at slot 468,587,937 invoked Lighthouse twice
(6,179 CU total) and succeeded — the appended assertions passed.

A separate transaction at slot 468,597,280 failed with
`InstructionError: Custom 6001` (assertion rejection), confirming the
framework does block some transactions.

---

## Why Outer-Balance Assertions Did Not Block the Observed Flow

The kit constructs a decoy-leg transaction:

- **Decoy legs**: treasury sends 1 SOL and relay sends 500 USDC to the victim.
- **Drain leg**: the operator program drains assets via CPI under the victim's
  signed authorization.

Outer token-account balance assertions see the decoy legs and report a net
positive. The actual asset movement happens inside the CPI, below the outer
instruction level. Only assertions scoped to CPI-side effects (e.g., "no
token account of mine may decrease, including via CPI") would catch this flow.

---

## Implications for Program Attribution

1. The operator program remains `TwrGADB9QPrLfTKpWuyq9tjgRaGsuzgRUMFTz51uhsa`
   (upgradeable; upgrade authority `3ofSxsTReb…`). No new operator program
   was deployed as of 2026-11-12.
2. Using `L2TExMFKdj` as an indicator would generate false positives —
   it is shared ecosystem infrastructure used by many wallets.
3. Verification method: read the program account (36 bytes; loader state
   variant 2 → programdata address at bytes 4–36), read the programdata
   account (45-byte header → ELF at offset 45), then `strings` / security.txt
   identifies the build. Apply this to any unfamiliar program invoked in a
   transaction before attributing it to a specific operator.

---

## Correction Scope

This correction propagates to `data/live/` notes and any findings documents
that referenced the initial slot-468,587,937 observation.
