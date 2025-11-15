import { IPlayingCard } from "../interfaces/Card";

//the order has to match the order in the Planets.ts planetsArray
export enum HandType {
    Pair = "Pair",
    Three = "Three Of a Kind",
    FullHouse = "Full House",
    Four = "Four Of a Kind",
    Flush = "Flush",
    Straight = "Straight",
    TwoPair = "Two Pair",
    StraightFlush = "Straight Flush",
    HighCard = "High Card",
    None = "",
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
};

export function getHandTypeForIndex(index: number): HandType {
    return Object.values(HandType)[index];
}

export function getChipsForHandType(handType: HandType): number {
    return handTypeBaseValues[handType][0];
}
export function getMultForHandType(handType: HandType): number {
    return handTypeBaseValues[handType][1];
}

export function addMultForHandType(handType: HandType, toAdd: number) {
    console.log("adding mult for ", handType, toAdd)
    handTypeBaseValues[handType][1] += toAdd;
}

export function addChipsForHandType(handType: HandType, toAdd: number) {
    handTypeBaseValues[handType][0] += toAdd;
}

export function checkHandType(hand: IPlayingCard[]): [HandType, number[]] {
    if (hand.length === 0) return [HandType.None, []];

    const sortedHand = [...hand].sort((a, b) => a.rank - b.rank);

    const isFlush = checkFlush(sortedHand);
    const isStraight = checkStraight(sortedHand);
    const [multiples, scoringCards] = checkMultiples(sortedHand);

    if (isStraight && isFlush) {
        return [HandType.StraightFlush, sortedHand.map(c => c.id)];
    }

    if (multiples.includes(4)) return [HandType.Four, scoringCards];

    if (multiples.includes(3) && multiples.includes(2)) return [HandType.FullHouse, scoringCards];

    if (isFlush) return [HandType.Flush, sortedHand.map(c => c.id)];

    if (isStraight) return [HandType.Straight, sortedHand.map(c => c.id)];

    if (multiples.includes(3)) return [HandType.Three, scoringCards];

    const pairCount = multiples.filter(m => m === 2).length;
    if (pairCount === 2) return [HandType.TwoPair, scoringCards];

    if (pairCount === 1) return [HandType.Pair, scoringCards];

    return [HandType.HighCard, [sortedHand.at(-1)!.id]];// if its a high card return the last index cuz its the biggest
}



function checkMultiples(hand: IPlayingCard[]): [number[], number[]] {
    const streaks: number[] = [];
    const scoringCards: number[] = [];

    let currStreak = 1;
    let lastCard: IPlayingCard | undefined = undefined;
    let currStreakCards: IPlayingCard[] = [];

    for (const card of hand) {
        if (lastCard && lastCard.rank === card.rank) {
            currStreak++;
            currStreakCards.push(card);
        } else {
            if (currStreak > 1) {
                streaks.push(currStreak);
                scoringCards.push(...currStreakCards.map(c => c.id));
            }
            currStreak = 1;
            currStreakCards = [card];
        }
        lastCard = card;
    }

    if (currStreak > 1) {
        streaks.push(currStreak);
        scoringCards.push(...currStreakCards.map(c => c.id));
    }

    return [streaks.length > 0 ? streaks : [1], scoringCards];
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