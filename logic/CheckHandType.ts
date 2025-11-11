import { IPlayingCard } from "../interfaces/Card";

export enum HandType {
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

export function checkHandType(hand: IPlayingCard[]): HandType {
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