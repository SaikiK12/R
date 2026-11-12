# Lure analysis: the social-engineering layer

A deep educational study of the lure pages themselves — what the victim
sees, and the tricks that make it work. Kit code is covered in
`FORENSIC_REPORT.md`; this document is about the pages. Everything
below comes from statically fetched HTML (2026-11-11); no page scripts
were executed.

## Case study 1: pumpanakin.fun — the two-layer page

The raw HTML of the reference lure contains almost nothing incriminating.
That is the point.

### Layer 1: what the raw HTML says

Every text element ships with random English filler: "carbon rush",
"parachute bomber", "wisecrack hypothesis", "restrain jam",
"discrimination bacon", "vote pitch horseshoe". A static crawler or a
takedown reviewer reading the served document finds word salad, not an
airdrop scam.

### Layer 2: what the victim sees

A `DOMContentLoaded` handler swaps every element's content by id from a
41-entry dictionary. The dictionary itself is armored three ways:

- **Split literals**: `"claim "+"reward"`, `"bigges"+"t Trum"+"p Coin"`.
- **Zero-width characters** (U+200B/200C/200D/2062/2063) inside words:
  `le\u2062\u2063\u0430r\u200Bn \u2062mor\u0435` renders as "learn more".
- **Cyrillic homoglyphs** for Latin letters (а е о р с т у …):
  `Рrivасу Роliсy` looks like "Privacy Policy" but matches no keyword
  signature for it.

Decoded, the dictionary is the whole pitch:

```
Take part in the biggest Trump Coin airdrop
the first official airdrop from the president of an entire country,
aimed at helping active participants.
claim reward / learn more
The official Airdrop from the Trump team
Available For Everyone — each participant can successfully claim a reward
23:59:59   $100.000   Q1 Airdrop
Q2 Airdrop — Users will be able to get rewards for their achievements later
Q3 Airdrop — coming soon
Don't miss your chance to get a Trump Coin
сonnect wаllet   (Cyrillic с, а, е)
© 2025 — All rights reserved / Contact us / Рrivасу Роliсy / Оur Sеrviсes
```

### Every road leads to the wallet

All eight buttons — "claim reward", "learn more", "Participate now!",
"connect wallet", and even the footer "Contact us", "Privacy Policy",
"Our Services" — call the same handler:

```js
window[atob('b3Blbg==') + 'Moda' + 'l']()   // window["open" + "Moda" + "l"]
```

There is no page two. The lure exists to produce one event: open the
fake wallet modal (the modal itself is kit code; see the report).

### Small, deliberate details

- `<html lang="ru" class="notranslate" translate="no">` — Russian
  locale for the target audience, with browser auto-translate disabled
  so the pitch renders exactly as staged (and so translation popups
  don't tip the victim that anything is odd).
- `setInterval(() => { document.body.style.top = '0'; }, 300)` — pins
  the body every 300 ms.
- `sbdst.js` runs a countdown from `23:59:59` and ends with a Russian
  alert "Время вышло!" ("Time's up!") — urgency pressure in the
  victim's own language.
- Social icons point at real destinations (`x.com/telegram`,
  `donaldjtrump.com`, `t.me/durov`) so hovering a link shows a
  plausible target.

### Why each trick exists (the educational part)

| Trick | What it defeats |
|---|---|
| Filler words in served HTML | Keyword-based phishing scanners, takedown review without JS |
| Dictionary swap on DOMContentLoaded | Static content analysis; snapshot crawlers that don't run scripts |
| Zero-width characters | Exact-substring blocklists ("learn more" never appears) |
| Cyrillic homoglyphs | Case-insensitive text signatures, victim copy-paste into search engines |
| Split string literals | Regex signatures over source text |
| `atob` + split handler name | Static references to `openModal` |
| Countdown + native-language alert | Victim hesitation (psychological, not technical) |

## Case study 2: the connect hook varies per deployment

The kit supports several wiring styles, and different lures use
different ones — a deliberate variation that breaks naive signatures:

| Lure | Connect trigger in the served HTML |
|---|---|
| pumpanakin.fun | inline `onclick` with `atob('b3Blbg==')+'Moda'+'l'` |
| allocationclaim.com | same, but split across **two** atob calls: `atob('b3Blbg==')+atob('TW9kYQ==')+'l'` |
| arvoniq.com | no inline JS at all: `class="… open-modal"`, wired by the bundle |
| isen.fund | **no connect hook anywhere** — a pure cover page (fake "TechWave Solutions – Android Development" company); the kit injects everything after load |

isen.fund is the extreme of the pattern: the served page is a complete,
plausible small-business site with zero phishing vocabulary. The scam
only exists after the bundle executes.

## Case study 3: what the bigger siblings add

**vaultspin.win (Jupiter airdrop).** Polished numbered-step onboarding:
"LIVE 100.000.000 Jupiter coins to giveaway … 01 Connect Wallet …
02 Claim Tokens … 03 Airdrop Distribution". The stepper format teaches
the victim the exact sequence the kit needs (connect → sign), dressed
as product UX. "Verified and Secure." as the safety theater tagline.

**amlbot.rest (fake AML company).** The most elaborate costume: a full
B2B compliance site — pricing ("From $0.2"), fake metrics ("+$100 000 000
risky funds detected", "60,000+ service providers", "300+ clients"),
"ISO certified" claims, team photos, partner logos, and a **six-language
switcher (EN/UA/ES/FR/DE/KZ)**. The drain hook is "Check Wallet": the
victim connects their wallet to "check it for dirty funds" — the
compliance fear angle instead of the airdrop greed angle. Widest
language targeting in the family.

**paybackpump.fun (pump.fun clone).** Pixel-level brand impersonation
with hotlinked pump.fun assets and a Chart.js price chart — the "you
already use this product" familiarity play ("payback").

**dexfi.app.** A DEX-interface clone with a Cloudflare Turnstile marker
in the HTML — the anti-bot check doubles as legitimacy theater for
victims and an analysis hurdle for crawlers.

## The playbook, distilled

Across all lures the same six levers appear; only the theme changes:

1. **Greed** — $100.000 rewards, 100M-coin giveaways, Q1/Q2/Q3 airdrop
   schedules.
2. **Authority** — a president's airdrop, official DEX/aggregator
   branding, ISO certification, compliance framing.
3. **Safety theater** — "Verified and Secure", Trust-style modal copy
   (served per-locale from `/api/locales`), Turnstile badges.
4. **Urgency** — countdowns, "LIVE" badges, "Don't miss your chance".
5. **Familiarity** — clones of products the victim already uses
   (pump.fun, Meteora, Jupiter, Dexscreener), real outbound links.
6. **Frictionless ask** — every clickable element, including footer
   links and privacy policies, is the same wallet-connect trigger.

The technical obfuscation (filler text, homoglyphs, zero-widths,
dictionary swap) exists to keep the page alive long enough for these
levers to work on a human. The two layers are complementary: layer one
starves the robots, layer two feeds the victim.
