export type Voucher = {
    index: number,
    name: string;
    desc: string;
}

export const vouchers: Voucher[] = [
    { index: 0, name: "Clearance Sale", desc: "All cards and packs in shop are 25% off" },
    { index: 1, name: "Wasteful", desc: "Permanently gain +1 discard each round" },
    { index: 2, name: "Grabber", desc: "Permanently gain +1 hand per round" },
    { index: 3, name: "Overstock", desc: "+1 card slot available in shop (to 3 slots)" },
];
