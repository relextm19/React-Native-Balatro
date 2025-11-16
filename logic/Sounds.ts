import { Audio } from 'expo-av';

export async function playSound(soundAsset: any) {
    const { sound } = await Audio.Sound.createAsync(
        soundAsset
    );
    await sound.playAsync();
}