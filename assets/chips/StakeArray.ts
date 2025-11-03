type Stake = {
    name: string;
    desc: string;
};

export const stakeArray: Stake[] = [
    { name: "White Stake", desc: "Base difficulty — None" },
    { name: "Red Stake", desc: "Small Blind gives no reward money" },
    { name: "Green Stake", desc: "Required score scales faster for each Ante" },
    { name: "Black Stake", desc: "30% chance for Jokers in shops/booster packs to have an Eternal sticker (can't be sold or destroyed)" },
    { name: "Blue Stake", desc: "-1 Discard" },
    { name: "Purple Stake", desc: "Required score scales even faster for each Ante" },
    { name: "Orange Stake", desc: "30% chance for Jokers in shops/booster packs to have a Perishable sticker (debuff after 5 rounds)" },
    { name: "Gold Stake", desc: "30% chance for Jokers in shops/booster packs to have a Rental sticker (costs $3 per round, can be bought for $1)" }
];
