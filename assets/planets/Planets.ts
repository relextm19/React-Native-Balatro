export type PlanetCard = {
    index: number;
    name: string;
    desc: string;
}

export const planetsArray: PlanetCard[] = [
    { index: 0, name: "Mercury", desc: "+15 Chips and +1 Mult for Pair" },
    { index: 1, name: "Venus", desc: "+20 Chips and +2 Mult for Three-of-a-Kind" },
    { index: 2, name: "Earth", desc: "+25 Chips and +2 Mult for Full House" },
    { index: 3, name: "Mars", desc: "+30 Chips and +3 Mult for Four-of-a-Kind" },
    { index: 4, name: "Jupiter", desc: "+15 Chips and +2 Mult for Flush" },
    { index: 5, name: "Saturn", desc: "+30 Chips and +3 Mult for Straight" },
    { index: 6, name: "Uranus", desc: "+20 Chips and +1 Mult for Two Pair" },
    { index: 7, name: "Neptune", desc: "+40 Chips and +4 Mult for Straight Flush" },
    { index: 8, name: "Pluto", desc: "+10 Chips and +1 Mult for High Card" },
];
