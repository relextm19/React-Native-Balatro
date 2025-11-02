import React, { ReactElement } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Skia, Canvas, Image, SkImage, SkRect, Atlas } from "@shopify/react-native-skia";

type AnteSelectPaneProps = {
    stakeSpriteSheet: SkImage
    blindSpriteSheet: SkImage
    stakeSourceRect: SkRect
    blindSourceRect: SkRect
};

export default function AnteSelectPane({ stakeSpriteSheet, blindSpriteSheet, stakeSourceRect, blindSourceRect }: AnteSelectPaneProps): ReactElement {
    const stakeTransforms = [Skia.RSXform(1, 0, 0, 0)]
    const blindImgScale = 1.5
    const blindTransforms = [Skia.RSXform(blindImgScale, 0, 0, 0)]

    //TODO: The atlas should probably be an image but it doesnt want to work so its that for now
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={[styles.blindStatusWrap, styles.centerWrap]}>
                    <Text style={styles.blindStatusText}>Current</Text>
                </View>

                <View style={[styles.blindNameWrap, styles.centerWrap]}>
                    <Text style={styles.blindNameText}>Small Blind</Text>
                </View>
                <View>
                    <Canvas style={{ width: blindSourceRect.width * blindImgScale, height: blindSourceRect.width * blindImgScale }}>
                        {stakeSpriteSheet && (
                            <Atlas
                                image={blindSpriteSheet}
                                sprites={[blindSourceRect]}
                                transforms={blindTransforms}
                            />
                        )}
                    </Canvas>
                </View>

                <View style={styles.requirementsContainer}>
                    <Text style={styles.requirementsHeader}>Score at least</Text>
                    <View style={styles.requirements}>
                        <Text style={styles.toScore}>300</Text>
                        <View >
                            <Canvas style={{ width: stakeSourceRect.width, height: stakeSourceRect.width }}>
                                {stakeSpriteSheet && (
                                    <Atlas
                                        image={stakeSpriteSheet}
                                        sprites={[stakeSourceRect]}
                                        transforms={stakeTransforms}
                                    />
                                )}
                            </Canvas>
                        </View>
                    </View>
                    <View style={[styles.rewardWrap, styles.centerWrap]}>
                        <Text style={styles.rewardText}>Reward: </Text>
                        <Text style={styles.rewardAmount}>$$$+</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const borderRadius = 7;
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#272521ff',
        width: '20%',

        borderWidth: 5,
        borderColor: "#362602ff",
        borderRadius: borderRadius,
        borderBottomWidth: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,

        shadowColor: "#4e3a10ff",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 8,

        padding: 3,
        paddingBottom: '5%',
    },

    innerContainer: {
        backgroundColor: '#23353aff',

        borderWidth: 2,
        borderColor: "#334444",
        borderRadius: borderRadius,

        padding: 10,

        gap: 10,
        alignItems: 'center'
    },

    blindStatusWrap: {
        backgroundColor: '#6d3b0aff',

        borderRadius: borderRadius,

        height: 24,

        shadowColor: "#000000",
        elevation: 100,

        width: "80%",
    },

    blindStatusText: {
        color: 'white',
    },

    blindNameWrap: {
        backgroundColor: '#362602ff',

        borderRadius: borderRadius,
        borderColor: '#423004ff',
        borderWidth: 2,

        height: 30,
        width: '100%',
    },

    blindNameText: {
        color: 'white',
    },

    requirementsContainer: {
        backgroundColor: '#19201fff',
        borderRadius: borderRadius,
        width: '90%'
    },

    requirementsHeader: {
        color: 'white',
        textAlign: 'center',
    },

    requirements: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row-reverse',
        gap: 4,
    },

    toScore: {
        color: '#c01e1eff',
        fontSize: 24,
    },

    rewardWrap: {
        flexDirection: 'row',
    },

    rewardText: {
        color: 'white',
        textAlign: 'center'
    },

    rewardAmount: {
        color: '#e0ae07ff'
    },

    centerWrap: {
        alignItems: 'center',
        justifyContent: 'center',
    }
})