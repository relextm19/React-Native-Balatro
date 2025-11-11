import { IPlayingCard } from "../interfaces/Card";

export enum HandType {
    None = "",
    HighCard = "High Card",
    Pair = "Pair",
    TwoPair = "Two Pair",
    Three = "Three Of a Kind",
    Straight = "Straight",
    Flush = "Flush",
    FullHouse = "Full House",
    Four = "Four Of a Kind",
    StraightFlush = "Straight Flush",
    RoyalFlush = "Royal Flush"
}

const handTypeBaseValues: Record<HandType, [number, number]> = {
    [HandType.None]: [0, 0],
    [HandType.HighCard]: [5, 1],
    [HandType.Pair]: [10, 2],
    [HandType.TwoPair]: [20, 2],
    [HandType.Three]: [30, 3],
    [HandType.Straight]: [30, 4],
    [HandType.Flush]: [35, 4],
    [HandType.FullHouse]: [40, 4],
    [HandType.Four]: [60, 7],
    [HandType.StraightFlush]: [100, 8],
    [HandType.RoyalFlush]: [100, 8],
};

export function getChipsAndMultForHandType(handType: HandType): [number, number] {
    return handTypeBaseValues[handType];
}

export function checkHandType(hand: IPlayingCard[]): HandType {
    if (hand.length === 0) return HandType.None
    const sortedHand = [...hand].sort((a, b) => a.rank - b.rank);

    const isFlush = checkFlush(sortedHand);
    const isStraight = checkStraight(sortedHand);
    const multiples = checkMultiples(sortedHand);

    if (isStraight && isFlush) {
        if (sortedHand[0].rank === 10) return HandType.RoyalFlush;
        return HandType.StraightFlush;
    }

    if (multiples.includes(4)) return HandType.Four;

    if (multiples.includes(3) && multiples.includes(2)) return HandType.FullHouse;

    if (isFlush) return HandType.Flush;

    if (isStraight) return HandType.Straight;

    if (multiples.includes(3)) return HandType.Three;

    const pairCount = multiples.filter(m => m === 2).length;
    if (pairCount === 2) return HandType.TwoPair;

    if (pairCount === 1) return HandType.Pair;

    return HandType.HighCard;
}


function checkMultiples(hand: IPlayingCard[]) {
    let streaks = [] as number[];
    let currStreak = 1;
    let lastCard: IPlayingCard | undefined = undefined;

    for (const card of hand) {
        if (lastCard && lastCard.rank === card.rank) {
            currStreak++;
        } else {
            if (currStreak > 1) {
                streaks.push(currStreak);
            }
            currStreak = 1;
        }
        lastCard = card;
    }
    if (currStreak > 1) {
        streaks.push(currStreak);
    }
    return streaks.length > 0 ? streaks : [1];
}

function checkFlush(hand: IPlayingCard[]): boolean {
    if (hand.length != 5) return false;
    for (let i = 1; i < hand.length; i++) {
        if (hand[i].suit !== hand[i - 1].suit) {
            return false;
        }
    }
    return true;
}

function checkStraight(hand: IPlayingCard[]): boolean {
    if (hand.length != 5) return false;
    for (let i = 1; i < hand.length; i++) {
        if (hand[i].rank !== hand[i - 1].rank + 1) {
            return false;
        }
    }
    return true;
}