export type Stake = {
    index: number;
    name: string;
    desc: string;
};

export const stakeArray: Stake[] = [
    { index: 0, name: "White", desc: "Base difficulty — None" },
    { index: 1, name: "Red", desc: "Small Blind gives no reward money" },
    { index: 2, name: "Green", desc: "Required score scales faster for each Ante" },
    { index: 3, name: "Blue", desc: "-1 Discard" },
    { index: 4, name: "Black", desc: "30% chance for Jokers in shops/booster packs to have an Eternal sticker (can't be sold or destroyed)" },
    { index: 5, name: "Purple", desc: "Required score scales even faster for each Ante" },
    { index: 6, name: "Orange", desc: "30% chance for Jokers in shops/booster packs to have a Perishable sticker (debuff after 5 rounds)" },
    { index: 7, name: "Gold", desc: "30% chance for Jokers in shops/booster packs to have a Rental sticker (costs $3 per round, can be bought for $1)" }
];
