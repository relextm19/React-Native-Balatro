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