import { IPlayingCard } from "../../interfaces/Card";

export type Deck = {
    index: number;
    name: string;
    desc: string;
    state?: { total: number, avaliable: number };
    cards?: Map<number, IPlayingCard>;
};

export const deckArray: Deck[] = [
    { index: 0, name: 'Red', desc: '+1 discard every round' },
    { index: 1, name: 'Blue', desc: '+1 hand every round' },
    { index: 2, name: 'Yellow', desc: 'Start with extra $10' },
    { index: 3, name: 'Green', desc: 'At end of each Round: $2 per remaining Hand, $1 per remaining Discard, Earn no Interest' },
    { index: 4, name: 'Black', desc: '+1 Joker slot, -1 hand every round' },
    { index: 5, name: 'Magic', desc: 'Start run with the Crystal Ball voucher and 2 copies of The Fool' },
    { index: 6, name: 'Nebula', desc: 'Start run with the Telescope voucher, -1 consumable slot' },
    { index: 7, name: 'Zodiac', desc: 'Start run with Tarot Merchant, Planet Merchant, and Overstock' },
    { index: 8, name: 'Checkered', desc: 'Start run with 26 Spades and 26 Hearts in deck' },
    { index: 9, name: 'Painted', desc: '+2 hand size, -1 Joker slot' },
    { index: 10, name: 'Anaglyph', desc: 'After defeating each Boss Blind, gain a Double Tag' },
    { index: 11, name: 'Plasma', desc: 'Balance Chips and Mult when calculating score for played hand, X2 base Blind size' },
    { index: 12, name: 'Erratic', desc: 'All Ranks and Suits in deck are randomized' },
    { index: 13, name: 'Ghost', desc: 'Spectral cards may appear in the shop, start with a Hex card' },
];
