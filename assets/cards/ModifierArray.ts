import { Modifier } from "../../interfaces/Card"

export type ModifierDesc = {
    for: Modifier
    desc: string
}

export const modifierDescs: Record<Modifier, string> = {
    [Modifier.Bonus]: "+30 Chips when scored",
    [Modifier.Mult]: "+4 Mult when scored",
    [Modifier.Glass]: "x2 Mult when scored\n1/4 Chance to shatter after scoring",
    [Modifier.Lucky]: "1/5 Chance for +20 Mult when scored\n1/15 Chance to give $20 on scored",
    [Modifier.Normal]: "No special changes",
}
