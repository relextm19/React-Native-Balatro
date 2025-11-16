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
    { index: 2, name: "The Hook", desc: "No discard this round" },
    { index: 3, name: "The House", desc: "No reward for this round" },
    { index: 4, name: "The Wall", desc: "Extra large blind" },
];
