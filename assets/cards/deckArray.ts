type Deck = {
    name: string;
    desc: string;
}

export const deckArray: Deck[] = [
    { name: 'Red', desc: '+1 discard every round' },
    { name: 'Blue', desc: '+1 hand every round' },
    { name: 'Yellow', desc: 'Start with extra $10' },
    { name: 'Green', desc: 'At end of each Round: $2 per remaining Hand, $1 per remaining Discard, Earn no Interest' },
    { name: 'Black', desc: '+1 Joker slot, -1 hand every round' },
    { name: 'Magic', desc: 'Start run with the Crystal Ball voucher and 2 copies of The Fool' },
    { name: 'Nebula', desc: 'Start run with the Telescope voucher, -1 consumable slot' },
    { name: 'Zodiac', desc: 'Start run with Tarot Merchant, Planet Merchant, and Overstock' },
    { name: 'Checkered', desc: 'Start run with 26 Spades and 26 Hearts in deck' },
    { name: 'Painted', desc: '+2 hand size, -1 Joker slot' },
    { name: 'Anaglyph', desc: 'After defeating each Boss Blind, gain a Double Tag' },
    { name: 'Plasma', desc: 'Balance Chips and Mult when calculating score for played hand, X2 base Blind size' },
    { name: 'Erratic', desc: 'All Ranks and Suits in deck are randomized' },
    { name: 'Ghost', desc: 'Spectral cards may appear in the shop, start with a Hex card' },
]
