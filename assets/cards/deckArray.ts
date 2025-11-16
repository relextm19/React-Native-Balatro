import { IPlayingCard, Suits, Ranks } from "../../interfaces/Card";

export type Deck = {
    index: number;
    name: string;
    desc: string;
    state?: { total: number, avaliable: number };
    cardsBySuits?: Map<Suits, Map<Ranks, IPlayingCard>>;
};

export const deckArray: Deck[] = [
    { index: 0, name: 'Red', desc: '+1 discard every round' },
    { index: 1, name: 'Blue', desc: '+1 hand every round' },
    { index: 2, name: 'Yellow', desc: 'Start with extra $10' },
    { index: 3, name: 'Green', desc: 'No special effects (for now)' },
    { index: 4, name: 'Black', desc: 'No special effects (for now)' },
    { index: 5, name: 'Magic', desc: 'No special effects (for now)' },
    { index: 6, name: 'Nebula', desc: 'No special effects (for now)' },
    { index: 7, name: 'Zodiac', desc: 'No special effects (for now)' },
    { index: 8, name: 'Checkered', desc: 'No special effects (for now)' },
    { index: 9, name: 'Painted', desc: 'No special effects (for now)' },
    { index: 10, name: 'Anaglyph', desc: 'No special effects (for now)' },
    { index: 11, name: 'Plasma', desc: 'No special effects (for now)' },
    { index: 12, name: 'Erratic', desc: 'No special effects (for now)' },
    { index: 13, name: 'Ghost', desc: 'No special effects (for now)' },
];
