# Operator on-chain program `TwrGADB9QPrLfTKpWuyq9tjgRaGsuzgRUMFTz51uhsa`

Recovered 2026-11-11 from public RPC (`getAccountInfo`, base64). The
program is downloadable by anyone; reproduce with:

```
getAccountInfo(TwrGADB9…)            # owner BPFLoaderUpgradeab1e…, 36-byte state
  -> programdata address HwWXKu3txa2CH6wMvPTMmZKY5bXHovftanBXbfUfqo5g
getAccountInfo(HwWXKu3…)             # 60,805 bytes: 45-byte header + ELF
```

The ELF is archived at `archive/operator_program/program.elf` (60,760 B,
SHA-256 `6de98643…`). Facts below come from the disassembly
(`llvm-objdump -d --triple=bpfel`) and from real transactions on
mainnet, including six decoded on 2026-11-12
(`decompiled/live/dynamic/real_drain_txs_2026-11-12.json`).

## Account facts

| | |
|---|---|
| Program | `TwrGADB9QPrLfTKpWuyq9tjgRaGsuzgRUMFTz51uhsa` (string-table address) |
| Loader | `BPFLoaderUpgradeab1e11111111111111111111111` (upgradeable) |
| Program data | `HwWXKu3txa2CH6wMvPTMmZKY5bXHovftanBXbfUfqo5g` |
| **Upgrade authority** | **`3ofSxsTReb9Uhom1NvHqH5oU1EEDLuUxZVbFix4fGNY6`** |
| Deployed | slot 461,751,300 (about a month before the live-mapping date) |
| Size | 60,760-byte eBPF ELF, stripped, native (no Anchor) |

## What the binary contains

- Syscalls: `sol_invoke_signed_c`, `sol_try_find_program_address`,
  `sol_log_`, `sol_log_pubkey`, `sol_memset_`, `sol_get_return_data`,
  `sol_get_sysvar`.
- Embedded pubkeys: ATA program, `SysvarRent`, **Token-2022**
  (`TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb`), plus an all-zero key.
- PDA seed strings: `mint`, `vault42`, `31`, `13`. The JS side calls
  these "vault" PDAs (`發` derives them against the program).
- Entry dispatch on the first instruction-data byte: 0–13 handled in
  one block, 14 and 16 have own handlers, 15 is invalid, 17 gated on
  account count (== 6), 18–20 in one block, 21 and 255 handled above
  that, everything else rejected. The kit's client-side builders use
  discriminators 2, 3, 4, 18 (see `tx_builders.js`); the operator's own
  tooling additionally uses 0, 21, and 255.

## Observed on-chain usage (mainnet txs, 2026-11-11)

A real drain transaction is a sequence:

1. **Marker (disc 0, ~144 CU).** No accounts. Payload is an ASCII tag
   like `1kd14ntu4|1|` or `r_ia6awp|0|` — a campaign/victim reference,
   so the operator can join on-chain drains to their `/api` telemetry.
2. **Token sweep (~1.4k–27k CU).** Either the kit's disc 3 single-byte
   form or a disc-255 composite (`ff 07 01 14 06 02 13 01`) that batches
   sub-operations (discriminators 20 and 19 visible inside). Handles
   Token-2022 **TransferCheckedWithFee** (seen in program logs) — i.e.
   it sweeps pump.fun-style Token-2022 tokens with transfer fees, not
   just legacy SPL.
3. **SOL sweep with the revenue split (disc 21 = 0x15, ~2.8k CU).**
   Accounts: victim, collector, campaign receiver, SystemProgram.
   **Proven 2026-11-12:** the argument bytes are `15 02 <pct>` where
   `<pct>` is the affiliate percentage — `0x4b` = 75%, `0x50` = 80%.
   The victim's loss splits `pct%` to the per-campaign receiver and
   the remainder to the vendor collector `6cwsqBqm…`. The `15 00`
   variant is a zero-percent (no-split) sweep.

## Live-confirmed marker tags (2026-11-12)

`1kd1mz4r-|1|`, `1kd1m5up7|1|`, `1kd1m4gfq|1|`, `1k7_ccf5p|1|` — same
format as the 2026-11-11 samples, plaintext ASCII in the marker ix.
Every campaign is individually named, publicly, forever.

Victim addresses observed in these transactions are intentionally not
catalogued in this repo.

## Assessment

The program is the drain engine: the JS kit only gets the victim to
sign; this program does the per-mint vault accounting and the actual
token/SOL movement, with the operator able to swap behavior by
upgrading the program (authority above) instead of shipping a new kit.
The "vault42" PDAs are per-victim/per-mint holding accounts the
receivers later collect from.
