export type Stake = {
    index: number;
    name: string;
    desc: string;
};

export const stakeArray: Stake[] = [
    { index: 0, name: "White", desc: "Base difficulty" },
    { index: 1, name: "Red", desc: "1$ lower win reward" },
    { index: 2, name: "Green", desc: "-1 hand size" },
    { index: 3, name: "Blue", desc: "Base difficulty (for now)" },
    { index: 4, name: "Black", desc: "Base difficulty (for now)" },
    { index: 5, name: "Purple", desc: "Base difficulty (for now)" },
    { index: 6, name: "Orange", desc: "Base difficulty (for now)" },
    { index: 7, name: "Gold", desc: "Base difficulty (for now)" }
];
