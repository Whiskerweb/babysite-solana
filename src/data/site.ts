// ============================================================
//  BABY GUY — single source of truth for copy and numbers.
//  Anything that can change lives here.
// ============================================================

/** Where the game itself lives. Every gold button on this page leads here.
 *
 *  THIS IS THE SOLANA TWIN of Baby Guy: the same game, settling on Solana in
 *  USDC, at play.babyguy.xyz (Fly app `tumble-sol-jeu`, which still answers on
 *  its own name). This site is babyguy.xyz. The Robinhood Chain game and its
 *  site (babyguy.dev, repo `babysite`) are a separate pair, and nothing here
 *  should point at them. */
export const GAME_URL = 'https://play.babyguy.xyz';

/** The live on-chain page the game itself serves: players, matches, buybacks,
 *  burns, every transaction, and the treasury addresses with their explorer links.
 *
 *  DERIVED from GAME_URL and never written out, because it is not a second site —
 *  it is the game's own `/api/suivi`. The backend that holds it is PRIVATE on Fly
 *  (no public port); the game server relays `/api/…` to it, which is why the path
 *  carries `/api/` and why `play.babyguy.xyz/suivi` is a 404. */
export const TRACKER_URL = `${GAME_URL}/api/suivi`;

/** The one action this page asks for. Stated once, used everywhere, so the
 *  header, the hero, the mid-page band and the closing section can never
 *  drift apart. */
export const PLAY_LABEL = 'Play now';

/** THE CHAIN the deployed game settles on — Solana, MAINNET since 9 September
 *  2026 (devnet for the first day). Read off the live game's own `/api/stats`,
 *  which reports `Solana mainnet`, the cluster `mainnet-beta`, the explorer and
 *  the USDC mint: Circle's, `EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v`. If
 *  those lines ever disagree with this file, the live game is right and this
 *  file is stale. */
export const CHAIN = 'Solana';
export const CLUSTER = 'mainnet';
export const USDC_MINT = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
export const CHAIN_EXPLORER = 'https://explorer.solana.com';
/** Every explorer link on this page carries the cluster: without it, the
 *  explorer looks the address up on mainnet and finds nothing. Empty once the
 *  game moves to mainnet. */
export const EXPLORER_QUERY = CLUSTER === 'mainnet' ? '' : `?cluster=${CLUSTER}`;

/** `mainnet` = real USDC, real money, since 9 September 2026. The page says so
 *  plainly, the same way it said "test dollar, worth nothing" the day before:
 *  sending someone to a money game under a wrong impression is the one thing we
 *  do not do — in either direction. Moves in step with `SOLANA_RESEAU` on the
 *  deployed backend (the game's `/api/stats` prints it as `reseau`). */
export const NETWORK = CLUSTER;

/** The day real money went live, written once: the FAQ and the footer both
 *  date the switch, and two dates would be one too many. */
export const MAINNET_SINCE = '9 September 2026';

/** WHAT IS NOT ON THE PAGE, and why (9 September 2026, the day of the switch):
 *   - no faucet: Circle's USDC has no mint function the game could call, so the
 *     lobby's "GET 20 TEST USDC" button is gone with devnet;
 *   - no SOL: the SOL → USDC swap in the deposit guide is switched off on the
 *     deployed backend (`SWAP=0`) until it has been exercised with real money.
 *     The page says "in USDC" and nothing else; the day it is on, the deposit
 *     line and the FAQ gain the SOL sentence back;
 *   - no live burn yet: the game's BG token has no mint on Solana mainnet
 *     (`BG_MINT` empty, `BRULAGE=0`), so the commission ACCUMULATES in USDC on
 *     the fees wallet, on-chain, until the token has a market. The page says
 *     "set aside for the buyback", not "burned today". */

/** How we say what this is. The product director's claim, 5 September 2026.
 *  Stated once here so the badge, the page title and the meta description
 *  cannot end up wording it three different ways. */
export const CLAIM_CATEGORY = 'run-to-earn';

/** The wallets the game's own sign-in screen offers, in its order. Read off the
 *  live gate ("SIGN IN WITH SOLANA · PHANTOM · SOLFLARE · BACKPACK"), not
 *  guessed: naming a wallet the gate does not offer sends someone to install one
 *  for nothing. Any wallet that speaks the Solana Wallet Standard works; these
 *  three are the ones the gate names. */
export const WALLETS = ['Phantom', 'Solflare', 'Backpack'];

/** The sign-up skin — PEPE, on the Solana twin (product director, 9 September
 *  2026: « supprime le skin de Vlad et mets en skin free a l'inscription le skin
 *  Pepe »). BabyVlad, the Robinhood CEO, stays on the Robinhood game and has no
 *  place here. In the game Pepe is `char-grenouille` (`cosmetics.js:MODELS`): the
 *  default character, free, and the one the full-screen GIFT BOX opens on at the
 *  first arrival in the lobby (`cadeau.js`, `boutique.js`) — hence « open your
 *  gift » in the copy: the player has one gesture to make, and it is the first of
 *  the game. The portrait is a clean render made for this page (gpt image via
 *  OpenRouter, 9 September 2026), the same file the game's roster shows. */
export const SKIN = {
  name: 'Pepe',
  who: 'Baby Pepe, the frog',
  image: '/img/pepe.webp',
};

/** The two money thresholds, in USDC. Product decisions of 7 September 2026,
 *  carried by the deployed backend's `.env` (`DEPOT_MINIMUM_MICROS`,
 *  `RETRAIT_MINIMUM_MICROS`): the lobby refuses a deposit under the first and a
 *  withdrawal under the second. There is no waiting period before a first
 *  withdrawal (`DELAI_PREMIER_RETRAIT_HEURES=0`, same decision). Real USDC
 *  since 9 September 2026: the thresholds are money. */
export const DEPOSIT_MIN = 5;
export const WITHDRAW_MIN = 25;

/** Share of every match set aside for the buyback and burn.
 *  The commission IS the burn: 100 % of it buys token back, nothing is kept. Until
 *  the token has a market on Solana, it accumulates in USDC on the fees wallet. */
export const BURN_PCT = '10';

/** Burn counter and buyback wallet: empty at launch. */
export const BURN_COUNTER: string | null = null;
export const BURN_WALLET: string | null = null;

export const TABLE_STAKE = 5;      // USDC
export const PLAYERS = 16;
export const COMMISSION_PCT = 10;
export const POT = 80;             // USDC collected on a 5 USDC table

/** The three tables the server actually opens. Read off `/etat` of the live
 *  game, not chosen here — a table this page names and the server does not
 *  open is a visitor sent to a queue that will never fill. */
export const TABLES = [2, 5, 10];  // USDC

/** The accounts. `href: null` means the account does not exist yet: it renders
 *  as a dimmed, UNCLICKABLE mark instead of a link.
 *
 *  Five icons pointing at `#` was fifteen dead links on the built page — the
 *  header, the burger menu and the footer each render the whole list. A dead
 *  link costs more than a missing one: the visitor clicks, nothing happens, and
 *  they conclude the site is broken rather than that the account is not open. */
export const socials = [
  { name: 'X',       href: 'https://x.com/BabyGuygame', icon: 'x' },
  { name: 'Discord', href: null, icon: 'discord' },
  { name: 'TikTok',  href: null, icon: 'tiktok' },
];

/** Said once, wherever a not-yet account is shown. */
export const SOCIAL_SOON = 'under construction. Coming soon — find us on X in the meantime.';

export const navLinks = [
  { label: 'The game',  href: '#the-game' },
  { label: 'The token', href: '#the-token' },
  { label: 'FAQ',       href: '#faq' },
];

/** The three formats the server opens, and what each one is.
 *
 *  `cuts` is the round structure read off the game's own `MODES[mode].survivants`
 *  (16 -> 8 -> 4 -> 1 for the arena): its length IS the number of rounds, which is
 *  why the page can no longer say "3 rounds" across the board — that is the arena
 *  alone. `paid` is how many places finish with at least their stake, and it is
 *  half the table in all three: that is the one line worth putting on the page. */
export const formats = [
  {
    name: '1v1',
    players: 2,
    paid: 1,
    cuts: [2, 1],
    text: 'One round, one survivor. Nothing to hide behind.',
  },
  {
    name: 'Squad',
    players: 4,
    paid: 2,
    cuts: [4, 2, 1],
    text: 'Two rounds. Half the table is gone after the first.',
  },
  {
    name: 'Arena',
    players: 16,
    paid: 8,
    cuts: [16, 8, 4, 1],
    text: 'Three rounds. Sixteen, then eight, then four — then a winner.',
  },
];

export const payouts = [
  { rank: '1st',       gain: '25.00', mult: '×5',         highlight: false },
  { rank: '2nd',       gain: '12.50', mult: '×2.5',       highlight: false },
  { rank: '3rd',       gain: '8.50',  mult: '×1.7',       highlight: false },
  { rank: '4th',       gain: '6.00',  mult: '×1.2',       highlight: false },
  { rank: '5th – 8th', gain: '5.00',  mult: 'stake back', highlight: true  },
  { rank: '9th – 16th', gain: '—',    mult: 'nothing',    highlight: false },
];

export const steps = [
  {
    n: '01',
    title: 'You bet',
    text: 'Pick a 2, 5 or 10 {USDC} table. Your stake is charged when the match starts, not when it ends.',
  },
  {
    n: '02',
    title: 'You run',
    text: '2, 4 or 16 players, depending on the table you picked. The maps are drawn at random, and players drop out at every round.',
  },
  {
    n: '03',
    title: 'You cash out',
    text: 'Your final standing decides your share of the pot. The paid half of your table walks away with at least its stake.',
  },
];

export const faq = [
  {
    q: 'What is Baby Guy?',
    a: 'A battle royale played for stakes, in three formats: 1v1, squads of four, and 16-player arenas. Everyone stakes 2, 5 or 10 {USDC}, the maps are drawn at random, and the final standing decides how the pot is split.',
  },
  {
    q: 'How do I win?',
    a: 'By finishing in the paid half of your table — the winner in a 1v1, the top two in a squad, the top eight in an arena. In the arena the first four take home more than their stake, 5th to 8th get exactly their stake back, and the bottom eight lose theirs. The full split is in the prize table below.',
  },
  {
    q: `Why ${CHAIN}?`,
    a: `Because the money has to be checkable by the person who lost it. Every stake, every pot, every payout and every burn is a transaction on ${CHAIN} that anyone can open in the explorer — we do not ask to be believed. It also means you sign in with the wallet you already have: ${WALLETS.join(', ')}. Each player's game wallet is a real ${CHAIN} address, each match has a pot address of its own, and a match that cannot collect every stake is cancelled and refunded before it starts.`,
  },
  {
    q: 'Is it just luck?',
    a: 'The three rounds are drawn at random, what happens inside them is not: timing, lines and reflexes decide. The draw puts all sixteen players on equal footing, it does not play for you.',
  },
  {
    q: 'Where does the commission go?',
    a: `${COMMISSION_PCT}% of everything staked — and all of it goes the same way: it is set aside, in {USDC}, on a fees wallet you can read on ${CHAIN}, to buy token back and burn it. Nothing is kept. The token does not have a market on ${CHAIN} yet, so for now the commission accumulates there; the buybacks and burns start the day it does, and every one of them will be on the game's on-chain page, along with the treasury addresses. You do not have to take that on trust.`,
  },
  {
    q: 'Can I play right now?',
    a: `Yes. Hit any gold button on this page, then either make an account with an email or sign in with your wallet — ${WALLETS.join(', ')} — and you are in a queue. Duels start at two players, squads at four, the arena at sixteen.`,
  },
  {
    q: 'Is it real money?',
    a: `Yes, since ${MAINNET_SINCE}. The game settles on ${CHAIN} ${NETWORK} in {USDC}, the dollar issued by Circle. You deposit {USDC} from ${WALLETS.join(', ')} — straight from the wallet, or by sending it to your own game address — from ${DEPOSIT_MIN} {USDC}; you withdraw from ${WITHDRAW_MIN} {USDC}, to a wallet you have linked, with no waiting period. Every stake, pot and payout is a transaction you can open in the Solana explorer. A match can cost you your entire stake.`,
  },
  {
    q: 'Which countries?',
    a: 'Real money is on the line, so paid matches are off limits wherever this kind of game is regulated or prohibited. Check the rules where you live before you deposit: an account does not grant access to paid matches. 18+, no exceptions.',
  },
];

// ============================================================
//  THE WELCOME WHEEL — /wheel
// ============================================================

/** Where the token is bought. Written once, read by the /wheel page only:
 *  the home page keeps its single gold action (play), and the buy button is a
 *  ghost next to it, never a second gold.
 *
 *  `null` ON THE SOLANA TWIN: the game's BG token has no mint on Solana
 *  mainnet yet, and no market — the PONS launchpad link of the Robinhood site
 *  sells a token on another chain, and sending a Solana player there would be
 *  wrong.
 *  With `null`, the /wheel page hides the buy button instead of linking
 *  nowhere. Fill it in the day a Solana market opens. */
export const BABY_BUY_URL: string | null = null;

/** The one link the home page carries to the wheel page. It lives in the
 *  header only — not in `navLinks`, which is rendered three times (header,
 *  burger, footer) and would turn one link into three. */
export const wheelLink = { label: 'The wheel', href: '/wheel' };

/** The welcome wheel: one spin per account, after a first finished match.
 *
 *  THE ODDS ARE THE PRODUCT. Eight slices, `pct` is the probability of each in
 *  percent, and the eight add up to exactly 100 (the 0 slice carries the
 *  remainder, which is why it reads 69.9999 and not 70). The page prints
 *  every figure as written here and draws the wheel to scale from the same
 *  numbers — there is no second copy to drift. `usdc` is the amount credited
 *  to the player's game balance when that slice lands.
 *
 *  `big` is what the 0 row shows in large type: the honest "70%" a reader
 *  takes away, with the exact figure printed small beside it. */
export const wheel = {
  minDeposit: 5,                 // USDC a player must have deposited before the spin counts
  average: '1.38',               // USDC, the expectation of one spin (sum of usdc x pct / 100)
  slices: [
    { usdc: 0,    pct: 69.9999, label: '69.9999%', big: '70%' },
    { usdc: 1,    pct: 15,      label: '15%' },
    { usdc: 2,    pct: 9,       label: '9%' },
    { usdc: 5,    pct: 4,       label: '4%' },
    { usdc: 10,   pct: 1.5,     label: '1.5%' },
    { usdc: 100,  pct: 0.3,     label: '0.3%' },
    { usdc: 200,  pct: 0.2,     label: '0.2%' },
    { usdc: 1000, pct: 0.0001,  label: '0.0001%', note: 'one in a million' },
  ],
};
