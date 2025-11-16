import { Audio } from 'expo-av';

//i know its not the best approach but i dont have time for that
export async function playSound(soundAsset: any) {
    const { sound } = await Audio.Sound.createAsync(soundAsset);

    try {
        await sound.playAsync();
        sound.setOnPlaybackStatusUpdate((status) => {
            if (!status.isLoaded) return;
            if (status.didJustFinish) {
                sound.unloadAsync();
            }
        });
    } catch (e) {
        console.warn("Sound error:", e);
        await sound.unloadAsync();
    }
}
