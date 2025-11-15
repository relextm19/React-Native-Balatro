import { View, Text } from "react-native"

function getHighlitedText(text: string, keywords: [string, string][], colors: string[], wordsAfterKeyword: number[]) {
    const parts = text.split(" ");
    const output: React.ReactNode[] = [];
    let i = 0;

    while (i < parts.length) {
        const matchedIndex = keywords.findIndex(([prefix, nextWord]) => {
            if (!parts[i].startsWith(prefix)) return false;
            if (nextWord !== "" && parts[i + 1] !== nextWord) return false;
            return true;
        });

        if (matchedIndex !== -1) {
            const wordsForward = wordsAfterKeyword[matchedIndex];

            const colorClass = `text-${colors[matchedIndex]}`;

            const group = parts.slice(i, i + wordsForward).join(" ");

            output.push(
                <Text key={i} className={`${colorClass} font-bold`}>
                    {group + " "}
                </Text>
            );

            i += wordsForward;
        } else {
            output.push(parts[i] + " ");
            i++;
        }
    }

    return <Text>{output}</Text>;
}


type itemDescriptionProps = {
    text: string,
}

export default function ItemDescription({ text }: itemDescriptionProps) {
    return (
        <View className="bottom-full z-50 absolute bg-white p-2 rounded-md h-full">
            <Text
                className=""
                adjustsFontSizeToFit
            >
                {getHighlitedText(
                    text,
                    [
                        ["+", "Chips"],
                        ["+", "Mult"],
                        ["x", "Mult"],
                        ["$", ""]
                    ],
                    ["blue-600", "customRed", "customRed", "accentGold"],
                    [2, 2, 2, 1]
                )}

            </Text>
        </View>
    )
}