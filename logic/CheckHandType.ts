import { IPlayingCard } from "../interfaces/Card";

enum HandType {
    HighCard,
    Pair,
    Three,
    Straight,
    Flush,
    FullHouse,
    Four,
    StraightFlush,
    RoyalFlush
}

export function checkHandType(hand: IPlayingCard[]) {
    const sortedHand = [...hand].sort((a, b) => a.rank - b.rank)
    checkMultiples(sortedHand)
    console.log(checkFlush(sortedHand));
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
    console.log(streaks)
    return streaks;
}

function checkFlush(hand: IPlayingCard[]): boolean {
    if (hand.length != 5) return false;
    let lastCard: IPlayingCard | undefined = hand[0];
    for (let i = 1; i < hand.length; i++) {
        if (lastCard && hand[i].suit !== lastCard.suit) {
            return false;
        }
    }
    return true;
}