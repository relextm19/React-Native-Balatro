export type PlanetCard = {
    index: number;
    name: string;
    desc: string;
    chipsToAdd: number,
    multToAdd: number,
}

export const planetsArray: PlanetCard[] = [
    { index: 0, name: "Mercury", desc: "+15 Chips and +1 Mult for Pair", chipsToAdd: +15, multToAdd: +1 },
    { index: 1, name: "Venus", desc: "+20 Chips and +2 Mult for Three-of-a-Kind", chipsToAdd: +20, multToAdd: +2 },
    { index: 2, name: "Earth", desc: "+25 Chips and +2 Mult for Full House", chipsToAdd: +25, multToAdd: +2 },
    { index: 3, name: "Mars", desc: "+30 Chips and +3 Mult for Four-of-a-Kind", chipsToAdd: +30, multToAdd: +3 },
    { index: 4, name: "Jupiter", desc: "+15 Chips and +2 Mult for Flush", chipsToAdd: +15, multToAdd: +2 },
    { index: 5, name: "Saturn", desc: "+30 Chips and +3 Mult for Straight", chipsToAdd: +30, multToAdd: +3 },
    { index: 6, name: "Uranus", desc: "+20 Chips and +1 Mult for Two Pair", chipsToAdd: +20, multToAdd: +1 },
    { index: 7, name: "Neptune", desc: "+40 Chips and +4 Mult for Straight Flush", chipsToAdd: +40, multToAdd: +4 },
    { index: 8, name: "Pluto", desc: "+10 Chips and +1 Mult for High Card", chipsToAdd: +10, multToAdd: +1 },
];
