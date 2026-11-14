# Operator Program — On-Chain Binary Analysis

**Program address:** `TwrGADB9QPrLfTKpWuyq9tjgRaGsuzgRUMFTz51uhsa`

Upgradeable. Upgrade authority: `3ofSxsTReb…`. Program data account:
`<see data/live/findings_1.json>`.

---

## Discriminators Observed in Client Bundle

| Disc | Instruction | Purpose |
|---|---|---|
| 0x00 (0) | MARKER | Writes ASCII campaign tag permanently to chain (affiliate ledger) |
| 0x02 (2) | TOKEN_SWEEP | CPI drains each SPL/Token-2022 token account |
| 0x03 (3) | (see chain analysis) | — |
| 0x04 (4) | (see chain analysis) | — |
| 0x12 (18) | (see chain analysis) | — |
| 0x15 (21) | SOL_SPLIT | Splits victim SOL: X% → receiver, rest → collector |

Disc 0x15 arg byte: `0x50` = 80% affiliate / 20% vendor in the reference captures.

---

## Discriminators in ELF (Server-Side Only)

Discriminators 14, 16, 17, 20 are present in the ELF binary but have no
corresponding call sites in the deobfuscated client bundle. Their semantic
meaning requires server-side tooling analysis. Status: OPEN (see `data/gap.md`).

---

## Vault PDA Derivation

Vault PDAs are derived from seeds: `["vault42", victim_pubkey_bytes]` against
the operator program address. The token sweep instructions drain token accounts
into vault PDAs before the SOL split instruction runs.

---

## Full Transaction Structure (From Mainnet Observations)

```
ix[0]  ComputeBudget.SetComputeUnitLimit(N)
ix[1]  ComputeBudget.SetComputeUnitPrice(microlamports)
ix[2]  TwrGADB9 disc 0x00  — MARKER: "1kd1mz4r-|1|"
ix[3+] TwrGADB9 disc 0x02  — TOKEN SWEEP (one per token account)
ix[N]  SystemProgram.Transfer — DECOY: treasury→victim 1 SOL
ix[N+1] ATA.CreateIdempotent  — victim's target token ATA
ix[N+2] Token.Transfer        — DECOY: relay→victim 500 USDC
ix[N+3] TwrGADB9 disc 0x15 args[0x02, pct] — SOL SPLIT
```

The transaction requires 3 signers: victim, treasury (`DvTqmF7u…`), receiver.
Victim provides 1 signature client-side; operator provides 2 server-side via
`/api/process`.

---

## Lighthouse Note

`L2TExMFKdjpN9kozasaurPirfHy9P8sbXoAN1qA3S95` (Lighthouse) appeared in one
observed drain transaction and was initially misattributed to this operation.
It is ecosystem-wide assertion infrastructure, not operator code. See
`archive/prog/lighthouse.md` for the full correction and verification method.

---

## Related Files

| File | Contents |
|---|---|
| `archive/prog/program.elf` | 60,760-byte eBPF ELF (SHA-256: `6de98643…`) |
| `archive/prog/program.account.bin` | 36-byte program account |
| `archive/prog/lighthouse.elf` | Lighthouse ELF for comparison |
| `data/live/findings_1.json` | 2026-11-12 T1 session findings |
| `data/live/findings_2.json` | 2026-11-12 T2 session findings |
