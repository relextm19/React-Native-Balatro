# Jonklero

---
## Game Preview

### Screenshots
<p align="center">
  <img src="https://github.com/user-attachments/assets/727c4e9f-2f33-4955-b249-dc8bb82adb88" width="200" alt="Game Screenshot 1">
  <img src="https://github.com/user-attachments/assets/bca74dec-b3b7-42d9-846e-6b6aa348303b" width="200" alt="Game Screenshot 2">
  <img src="https://github.com/user-attachments/assets/485e3e3f-583c-4927-a3c9-5c54838b17d6" width="200" alt="Game Screenshot 3">
  <img src="https://github.com/user-attachments/assets/936193a3-7fe4-436c-88b7-56d2436379cf" width="200" alt="Game Screenshot 4">
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/35d132da-9f68-44b3-b7d9-0a214f9a0480" width="200" alt="Game Screenshot 5">
  <img src="https://github.com/user-attachments/assets/a2b55f27-d1ab-48aa-ac80-806824426b5a" width="200" alt="Game Screenshot 6">
  <img src="https://github.com/user-attachments/assets/5cc49977-a09c-4a6d-9ee5-a370f79def22" width="200" alt="Game Screenshot 7">
  <img src="https://github.com/user-attachments/assets/cde7ec83-e125-4aae-81bd-6771da153ff2" width="200" alt="Game Screenshot 8">
</p>

### Gameplay

---

## Table of Contents

* [About the Game](#about-the-game)
* [Key Features](#key-features)
* [Tech Stack](#tech-stack)
* [Usage](#usage)
  * [1. Recommended: Direct Download (Android)](#1-recommended-direct-download-android)
  * [2. Manual Setup (For Developers)](#2-manual-setup-for-developers)

---

## About the Game

This is a single-player roguelike game built for mobile, heavily inspired by Balatro. The core gameplay loop revolves around playing poker hands to score points, defeating Blinds, building your deck with specially modified cards, and improving your scoring with planet cards.

---

## Key Features

* Roguelike Runs: Each run is unique. The deck you draw, the blinds you face, and the shops you encounter are all randomly generated.
* Powerful Synergies: As you play you learn ways combine cards and upgrades to create combinations that will allow you to reach higher scores.
* Cross-Platform: Developed with Expo, allowing it to run on cross-platform.

---

## Tech Stack

* Core: [React Native](https://reactnative.dev/)
* Framework: [Expo (Go)](https://expo.dev/)
* Graphics: [React Native Skia](https://shopify.github.io/react-native-skia/)
* Animations: [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
* Language: [TypeScript](https://www.typescriptlang.org/)

---

## Usage

There are two ways to get the game.

### 1. Recommended: Direct Download (Android)
> Download Latest Build
>
> * Link: [Download Game (Android)](https://expo.dev/artifacts/eas/t9efdZ8GLTAuZdTMk7wMmj.aab)
>
> Note: This is an `.aab` (Android App Bundle) file. You may need to enable "sideloading" or use a specific installer app on your Android device to install it. For the simplest developer setup, see the "Manual Setup" section below.

---

### 2. Manual Setup

This method lets you run the project from the source code using Expo Go. It works on both iOS and Android.

#### Prerequisites

* Node.js & npm: [Download & Install Node.js](https://nodejs.org/) (which includes npm).
* Expo CLI: Install it globally on your machine.
    ```bash
    npm install -g expo-cli
    ```
* Expo Go App: Install the Expo Go app on your physical iOS or Android device.
    * [Download for iOS](https://apps.apple.com/us/app/expo-go/id982107779)
    * [Download for Android](https://play.google.com/store/apps/details?id=host.exp.exponent)
* Emulator: (Optional) If you have an emulator set up, you can run the game by executing `npx expo start` and pressing `i` for iOS Simulator or `a` for Android Emulator.

#### Running the Project

1. Clone the repository:
    ```bash
    git clone https://github.com/relextm19/Jonklero/
    ```

2. Navigate into the folder:
    ```bash
    cd Jonklero
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Start the Expo server:
    ```bash
    npx expo start
    ```

5. Run on your device:
    * A QR code will appear in your terminal.
    * Open the Expo Go app on your phone.
    * Scan the QR code with your phone's camera (or through the app).
    * The project will build and launch on your device!

Alternatively, you can run it on an iOS Simulator (press `i`) or Android Emulator (press `a`) from the terminal.
