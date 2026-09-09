# Baby Guy — landing page (Solana twin)

**This is the site of the SOLANA twin of Baby Guy**: the same game, settling on Solana in
USDC, at **https://play.babyguy.xyz** (Fly.io, `tumble-sol-jeu`, repo `fallsolana`). This
site lives at **https://babyguy.xyz** (Vercel, static). It is a separate repository from
`babysite` (https://babyguy.dev, the Robinhood Chain game): the two sites share their
layout and copy but not their chain, their dollar, their wallets or their addresses, and
a change to one is ported to the other by hand.

One page, English, built with [Astro](https://astro.build). Single goal: send the visitor
into the game. Every gold button on the page leads to `GAME_URL` — nothing else is asked
of them, there is no form left to fill.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
```

## Page order

| # | Section | File |
|---|---------|------|
| 1 | Hero — Bet. Run. Cash out. | `src/components/Hero.astro` |
| 2 | Trailer, full width, autoplay muted + sound toggle | `src/components/Trailer.astro` |
| 3 | How it works + **the three formats** + prize table | `src/components/HowToPlay.astro`, `src/components/Formats.astro` |
| 4 | Short play band | `src/components/PlayBar.astro` |
| 5 | Token & burn, ending on the on-chain proof | `src/components/Token.astro` |
| 6 | Play — what you need, and the door | `src/components/Play.astro` |
| — | FAQ (6 accordions) | `src/components/Faq.astro` |
| — | Footer (18+, jurisdiction) | `src/components/Footer.astro` |

Header: logo · three anchors (The game / The token / FAQ) · five socials · one gold
button. It becomes sticky past 600 px of scroll, reduced to logo + play button. The
burger menu carries the play link too — on mobile it is the panel the visitor has open.

## The wheel page — `/wheel`

`src/pages/wheel.astro`, one page, English: the welcome wheel (finish a first
match, spin once, up to 1,000 USDC). Its numbers — the eight slices, their odds,
the average spin, the minimum deposit — live in `wheel` in `src/data/site.ts`;
the table prints them, the disc is drawn to scale from them, and the page never
carries a second copy. `BABY_BUY_URL` is the token's launchpad, and `wheelLink`
is the single link the header carries to the page. The header is shared: off
the home page its `#` anchors are prefixed with `/` so they still land.

`public/img/babytrump.webp` is the game's own catalogue portrait (512 px),
standing in until the final key art arrives.

## Everything you will want to edit

`src/data/site.ts` holds the copy and every number.

| Constant | Now | What it does |
|---|---|---|
| `GAME_URL` | `https://play.babyguy.xyz` | **Where every gold button goes.** Six links on the built page read it; there is no second place to change. |
| `TRACKER_URL` | *derived* | The game's live on-chain page, `GAME_URL + /api/suivi` — never written out, so it cannot drift from `GAME_URL`. The `/api/` is not decorative: the backend that serves it is private on Fly and the game server relays `/api/…` to it, which is why `play.babyguy.xyz/suivi` is a 404. Linked from the Token section and the footer. |
| `PLAY_LABEL` | `'Play now'` | The words on those six buttons. |
| `CHAIN` / `CLUSTER` / `CHAIN_EXPLORER` / `EXPLORER_QUERY` / `USDC_MINT` | Solana, mainnet, explorer.solana.com, empty, Circle's USDC mint | The chain the twin settles on. Read off the live game's `/api/stats` (`reseauDetail`). Every explorer link carries `EXPLORER_QUERY`: without the cluster, the explorer looks the address up on mainnet and finds nothing. |
| `NETWORK` / `MAINNET_SINCE` | `'mainnet'` (= `CLUSTER`) / `'9 September 2026'` | Printed in the notice on the play section, the FAQ and the footer: real USDC, real money, dated. **Moves with `SOLANA_RESEAU` on the deployed backend** (`/api/stats` prints it as `reseau`). Devnet lasted one day (9 September 2026); the commit before this one is the devnet wording, should a test network ever come back. |
| `CLAIM_CATEGORY` | `'run-to-earn'` | How we name what this is. Stated once so the hero badge, the `<title>` and the meta description cannot word it three different ways. |
| `DEPOSIT_MIN` / `WITHDRAW_MIN` | 5 / 25 | The two money thresholds, in USDC, from the deployed backend's `DEPOT_MINIMUM_MICROS` and `RETRAIT_MINIMUM_MICROS` (product decisions of 7 September 2026). No waiting period before a first withdrawal. The test-dollar mint of the testnet days (`FAUCET_USDC`, `FAUCET_EVERY_MINUTES`) is gone with the testnet: real USDC has no mint function. |
| `WALLETS` | Phantom, Solflare, Backpack | Read off the live sign-in gate ("SIGN IN WITH SOLANA"), not guessed — naming a wallet the gate does not offer sends someone to install one for nothing. |
| `SKIN` | BabyVlad | The welcome skin shown in the Play section. Ships in the game as `char-tinytrader`, opened from a gift box on first arrival in the lobby. |
| `TABLES` | `[2, 5, 10]` | The tables the server opens, read off the live game's `/etat`. A table named here that the server does not open sends a visitor to a queue that never fills. |
| `formats` | 1v1 / Squad / Arena | The three formats, drawn as pips in `Formats.astro`. `cuts` is the game's own `MODES[mode].survivants` (`16 → 8 → 4 → 1`), so **its length is the round count** — 1, 2 and 3, which is why the page no longer says "3 rounds" outside the arena. `paid` is the count of non-bronze ranks from `grade(mode, rank)`: half the table, in all three. |
| `BURN_PCT` | `'10'` | Share of every match bought back and burned = the whole commission. |
| `BURN_COUNTER` | `null` | Burned-tokens counter. Shows `—` until you set it. |
| `BURN_WALLET` | `null` | Buyback wallet address. Shows `—`, becomes a Blockscout link (`CHAIN_EXPLORER`) once set. |
| `socials` | X live, Discord + TikTok pending | Three accounts. `href: null` renders a dimmed, **unclickable** mark instead of a link — the list is rendered three times, so five `#` hrefs were fifteen dead links. Give an account an `href` and it becomes a link with no other change. |
| `SOCIAL_SOON` | "under construction…" | The tooltip on a pending account. The footer also states it in visible text, because a tooltip does not exist on a phone. |

Numbers used across the page (5 USDC table, 16 players, 10 % commission, 80 USDC pot,
25 / 12.50 / 8.50 / 6.00 / stake back / nothing) all come from `payouts`, `TABLE_STAKE`,
`PLAYERS`, `COMMISSION_PCT` and `POT` in the same file.

> **`SKIN` is real now.** It was not when this section was written, and the warning
> that stood here said so. BabyVlad shipped on 5 September 2026 as `char-tinytrader`
> — rigged GLB, catalogue entry, and a welcome **gift box** that waits for a click on
> the player's first arrival in the lobby, then unlocks and equips him. The copy says
> "open it and he is yours" rather than "we give it to you" because that click is the
> real mechanism, and it is the player's first act in the game.

> **`payouts` no longer matches the shipped game.** The table here promises a fixed
> 25.00 for first place on a 5 USDC arena; the game draws the winner's gain on a wheel
> and pays anywhere from 12.50 to 39.50 (expectation 23.37). The `×5` / `×2.5` column is
> a multiplier, which the game itself is forbidden from showing a player. Fixing it is a
> product decision — the real per-rank ranges are one command away:
> `cd tools/feel-lab && node diag/economie.mjs` in the game repo.

## Media

```
public/img/babyvlad.webp       632×760, 55 kB (from a 1144×1375 / 1.3 MB PNG — 24x smaller)
public/icons/solana.svg             the Solana logomark (gradient), used on the hero, the play notice and the badge,
                               copied from the game's own tools/feel-lab/public/icons/
public/videos/trailer.mp4      30 s, 1600×900, 8.4 MB (re-encoded from finalnonst_ST.mp4,
                               2560×1440 / 42 MB — 11 Mbps is not a landing page)
public/posters/trailer.jpg     frame at 7.5 s — five characters on the course, the widest
                               shot in the film. The subtitles are burned in throughout, so
                               a caption-free frame is a close-up or nothing
public/posters/jeu-course.jpg  poster for the gameplay loop
public/img/hero-bg.webp        hero key art, 1671×941, 128 kB (from a 1.79 MB PNG)
public/img/hero-og.jpg         1200×675 JPEG, the og:image — several scrapers, X included,
                               handle WebP poorly, and X is the only account we have open
public/img/logo.png            official logo, grey background removed
```

**Missing:** `public/videos/jeu-course.mp4`. The section renders its poster until you
drop the file in — nothing breaks, no 404 is shown to the visitor.

Video rules already wired in `src/components/LoopVideo.astro` and `src/layouts/Layout.astro`:
`muted`, `loop`, `playsinline`, `preload="metadata"`, poster always set, lazy-loaded via
IntersectionObserver (the trailer is the only eager one), paused off screen, and under
`prefers-reduced-motion` the source is never attached at all — the poster stands in.

`assets/unused-posters/` holds the placeholder posters made for the trials and characters
sections, which were removed from the page.

## Deploying

Vercel, static, from `main`. `npm run build` locally reproduces exactly what it serves —
there is no server-side anything on this page.

## The dollar is USDC

The page is written **USDC** everywhere: the `<Usdc />` mark, the `{USDC}` placeholder
that `T.astro` swaps for it, and the prose. Since 9 September 2026 that is Circle's USDC
on Solana mainnet (`USDC_MINT`), real money; on devnet, the day before, it was the game's
own test mint under the same name. Three things the page deliberately does NOT say, and
why: no faucet (Circle's USDC cannot be minted by the game), no SOL (the SOL → USDC swap
of the deposit guide is switched off on the deployed backend until it has been exercised
with real money), no live burn (the BG token has no mint on Solana mainnet yet: the
commission accumulates in USDC on the fees wallet, and the page says "set aside", not
"burned"). Each comes back the day the backend turns it on — see the comment block above
`MAINNET_SINCE` in `site.ts`.

## The hero image

The key art is **landscape 16:9 and carries the BABY GUY logo inside it**, which the hero
treatment has to respect in two ways:

- **The scrim is a pool, not a wash.** The old one was a violet gradient over the bottom
  58 %, tuned for a dark photograph. This art is bright — blue sky, yellow podium — and
  that wash drowned half of it. It is now an ellipse behind the text column, so the edges
  stay lit (Vlad on the left, Trump on the right), plus a short base to meet the section
  below.
- **Under 720 px the image stops filling and becomes a band.** In `cover`, a 16:9 image
  behind a phone-shaped hero shows only the middle ~26 %: the logo clipped on both sides
  and not one character left. It is now laid full width at the top (`100% auto`, height =
  56.31vw = 941/1671) with the copy below it on violet. Change the art's aspect ratio and
  that number has to change with it.

## A trap this repo fell into once

**A scoped selector cannot reach an element rendered by a child component.** The socials
moved into `Social.astro`, and `.hdr__social{…}` in `Header.astro` — plus `.ft__socials a`
in `Footer.astro` — silently stopped matching: Astro stamps its scope attribute on the
elements of *its own* template, and the `<a>` now carries `Social`'s. Nothing errored, the
circles simply vanished from the header and around the X in the footer. Selectors that
cross a component boundary need `:global(...)`.

## Design rules baked in

- Pastel palette, all tokens in `src/styles/global.css`: cream `#FBF6FF` (the line
  between sections), violet `#6E52D4`, deep violet `#34266F`, ink violet `#2A1E5E`,
  sky `#4A82D8`, pink `#FF7FB0`, gold `#FFC93C`.
- Sections are separated by **diagonal cuts** — `src/components/Divider.astro`, one per
  section, dropped at the top of the section it belongs to. Props: `color` (the section's
  own background), `dir` (`right` / `left`, alternate them) and `height`. Each cut is
  edged with a cream line. A section's vertical padding must stay above the cut height,
  otherwise content slides under the diagonal.
- **One gold button per screen** — gold is the action colour, and it now means exactly
  one thing: go and play. Everything else is ghost, pink or plain text.
- **The Solana mark is ATTRIBUTION, not a partner logo.** `ChainBadge.astro` is a
  pixel-for-pixel copy of the game's own `.rh-badge` (lime `#CCFF00`, black feather, 3 px
  drop shadow) so the site and the game say the same thing the same way. It reads *built
  on*, and it is deliberately **absent from the header**: sitting next to our own logo it
  would read as a co-brand rather than as "this is the chain we settle on".
- **Three visual idioms in `#the-game`, and they do not borrow from each other.** The
  three beats own the outlined numerals on a rail; the Token section owns the boxed
  look; the formats block owns the pips. Each shows its data rather than stating it —
  the prize chart is drawn to scale, the pips are one per seat.
- Mobile first. The prize table scrolls horizontally inside its own container.
- No promise of profit anywhere: the copy states a split rule, the footer says so too.
- **The money is real, and the page says so, not in a footnote.** The play section
  carries it in the lime pill, the FAQ answers it outright, the footer repeats it. The
  page sends people to a game that takes stakes; letting them assume those stakes are
  play money would be the one dishonesty this page cannot afford. (Until 7 September
  2026 the same three places said the opposite, for the same reason.)
