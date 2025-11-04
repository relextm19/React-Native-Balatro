export type Blind = {
    index: number;
    name: string;
    desc: string;
};

export enum BlindState {
    selected = "current",
    defeated = "defeated",
    upcoming = "upcoming"
}

export const blindsArray: Blind[] = [
    { index: 0, name: "Small Blind", desc: "A standard smaller blind with no modifiers" },
    { index: 1, name: "Big Blind", desc: "A standard larger blind with no modifiers" },
    { index: 2, name: "The Hook", desc: "Discards 2 random cards held in hand after every played hand" },
    { index: 3, name: "The House", desc: "First hand is drawn face-down" },
    { index: 4, name: "The Wall", desc: "Extra large blind (4x base required)" },
    { index: 5, name: "The Wheel", desc: "1 in 7 cards get drawn face down during the round" },
    { index: 6, name: "The Arm", desc: "Decrease level of played poker hand by 1" },
    { index: 7, name: "The Club", desc: "All Club cards are debuffed" },
    { index: 8, name: "The Fish", desc: "Cards drawn face down after each hand played" },
    { index: 9, name: "The Psychic", desc: "Must play 5 cards (not all cards need to score)" },
    { index: 10, name: "The Goad", desc: "All Spade cards are debuffed" },
    { index: 11, name: "The Water", desc: "Start with 0 discards" },
    { index: 12, name: "The Window", desc: "All Diamond cards are debuffed" },
    { index: 13, name: "The Manacle", desc: "-1 Hand Size" },
    { index: 14, name: "The Eye", desc: "No repeat hand types this round" },
    { index: 15, name: "The Mouth", desc: "Only one hand type can be played this round" },
    { index: 16, name: "The Plant", desc: "All face cards are debuffed" },
    { index: 17, name: "The Serpent", desc: "After Play or Discard, always draw 3 cards (ignores hand size)" },
    { index: 18, name: "The Pillar", desc: "Cards played previously this Ante are debuffed" },
    { index: 19, name: "The Needle", desc: "Play only 1 hand" },
    { index: 20, name: "The Head", desc: "All Heart cards are debuffed" },
    { index: 21, name: "The Tooth", desc: "Lose $1 per card played" },
    { index: 22, name: "The Flint", desc: "Base Chips and Mult for played poker hands are halved for the entire round" },
    { index: 23, name: "The Mark", desc: "All face cards are drawn face down" },
    { index: 24, name: "Amber Acorn", desc: "Flips and shuffles all Joker cards" },
    { index: 25, name: "Verdant Leaf", desc: "All cards debuffed until 1 Joker sold" },
    { index: 26, name: "Violet Vessel", desc: "Very large blind (6x base required)" },
    { index: 27, name: "Crimson Heart", desc: "One random Joker disabled every hand (changes every hand)" },
    { index: 28, name: "Cerulean Bell", desc: "Forces 1 card to always be selected" },
];
