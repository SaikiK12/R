# L2TExMFKdjpN9kozasaurPirfHy9P8sbXoAN1qA3S95 is Lighthouse, not operator infrastructure

Correction of the 2026-11-12 evening finding (`decompiled/live/live_findings_2026-11-12_T2.json`,
FINDING_6, and the matching update block in `WEAKNESSES.md`). A drain transaction
decoded that day invoked an unfamiliar program and it was initially misattributed
to the operator. On-chain evidence:

| Fact | Value |
|---|---|
| Program | `L2TExMFKdjpN9kozasaurPirfHy9P8sbXoAN1qA3S95` |
| Identity | **Lighthouse — the open-source Solana assertion protocol** ([github.com/Jac0xb/lighthouse](https://github.com/Jac0xb/lighthouse), MIT license, security.txt `name: "Lighthouse Protocol"` in the binary) |
| Deployed | slot 294,179,293 (~mid-2024), **immutable** — no upgrade authority set |
| Program data | `CJ5WEjifs4d77pEA9DpewppByFjHcAkNv3YYSuSoDk7c` (424,293 bytes) |
| ELF | 424,248 bytes, sha256 `a89179ae024ac36aa5fc308251caa84cd0a3390ae66d8523514004a86d5148bb` — kept in this dir as `lighthouse_L2TExMFKdj.elf` (public on-chain data) |
| Embedded pubkeys | SystemProgram, Tokenkeg, Token-2022, Stake program, BPFLoaderUpgradeable — consistent with Lighthouse's assertion framework (`AssertMintAccount`, `AssertTokenAccount`, `AssertStakeAccount`, `AssertUpgradeableLoaderAccount`, …) |
| Traffic | 4,000+ signatures per day — it is called by wallets across the ecosystem, not by one operation |

## Why a drain transaction called it

Lighthouse works by appending assertion instructions to transactions: a wallet
simulates the expected end state (e.g. "token balance X should be Y after this
tx") and asserts it at runtime; a failed assertion aborts the whole transaction.
The decoded drain tx at slot 468,587,937 invoked Lighthouse twice (6,179 CU
total) and still succeeded — meaning the appended assertions **passed**.

A separate transaction at slot 468,597,280 failed with
`InstructionError: Custom 6001` (an assertion rejection), so the framework
does block some transactions — just not this kit's.

## What this means for defenders

1. There is **no new operator program** as of 2026-11-12 evening. The drain
   engine remains `TwrGADB9QPrLfTKpWuyq9tjgRaGsuzgRUMFTz51uhsa` (upgradeable,
   authority `3ofSxsTReb…`). Watch it — but Lighthouse address-pivoting on
   `L2TExMFKdj` as an IOC would be a false positive; it is ecosystem-shared
   defensive infrastructure.
2. Wallet-appended Lighthouse assertions **did not stop the observed drain**:
   the kit's theft leg executes as a CPI through the operator program with the
   victim's own signature authorizing vault PDA sweeps, while the decoy legs
   make the outer instruction-level balance delta look positive. Guardrails
   keyed on outer token-account deltas can pass. Assertions scoped to "no
   token account of mine may decrease, period, including via CPI" are what
   would catch this flow — wallets integrating Lighthouse should assert on
   CPI-side effects, not just top-level balances.
3. Verification path used here, reproducible by anyone: read the program
   account (36 bytes, loader state variant 2 → programdata address at
   bytes 4..36), read the programdata account (45-byte header → ELF at
   offset 45), then `strings`/security.txt identify the build. Any unknown
   program called by a drain tx should be fingerprinted this way before being
   labeled operator infrastructure.

Correction propagated to `WEAKNESSES.md` and `decompiled/live/live_findings_2026-11-12_T2.json`.
