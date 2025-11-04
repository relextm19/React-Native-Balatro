export type Stake = {
    name: string;
    desc: string;
};

export const stakeArray: Stake[] = [
    { name: "White", desc: "Base difficulty — None" },
    { name: "Red", desc: "Small Blind gives no reward money" },
    { name: "Green", desc: "Required score scales faster for each Ante" },
    { name: "Blue", desc: "-1 Discard" },
    { name: "Black", desc: "30% chance for Jokers in shops/booster packs to have an Eternal sticker (can't be sold or destroyed)" },
    { name: "Purple", desc: "Required score scales even faster for each Ante" },
    { name: "Orange", desc: "30% chance for Jokers in shops/booster packs to have a Perishable sticker (debuff after 5 rounds)" },
    { name: "Gold", desc: "30% chance for Jokers in shops/booster packs to have a Rental sticker (costs $3 per round, can be bought for $1)" }
];
