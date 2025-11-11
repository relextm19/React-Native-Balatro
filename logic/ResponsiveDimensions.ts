import { useEffect, useState } from "react";
import { Dimensions, ScaledSize } from "react-native";

export function useScreenDimensions() {
    const [screenData, setScreenData] = useState<ScaledSize>(Dimensions.get('screen'));

    useEffect(() => {
        function onChange({ screen }: { screen: ScaledSize }) {
            setScreenData(screen);
        };

        const subscription = Dimensions.addEventListener('change', onChange);

        return () => {
            subscription?.remove();
        };
    }, []);

    return screenData;
}
