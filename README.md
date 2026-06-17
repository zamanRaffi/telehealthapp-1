# 🏥 Tele-Health App

![React Native](https://img.shields.io/badge/React_Native-0.81-61DAFB?logo=react&logoColor=white)
![Expo](https://img.shields.io/badge/Expo-54-000020?logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Platform](https://img.shields.io/badge/Platform-Android%20%7C%20iOS%20%7C%20Web-lightgrey?logo=android&logoColor=white)
![Branch](https://img.shields.io/badge/Branch-master-orange?logo=git&logoColor=white)

A cross-platform **Tele-Health mobile application** built with React Native & Expo. Connects patients with healthcare services across Android, iOS, and Web from a single codebase.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Running the App](#-running-the-app)
- [Dependencies](#-dependencies)

---

## ✨ Features

- 📱 Cross-platform — Android, iOS & Web from one codebase
- 🗺️ File-based routing with **Expo Router**
- 🎨 Icon support with **Lucide React Native**
- 🔄 Server state management with **TanStack React Query**
- 🗃️ Client state management with **Zustand**
- 📍 Location services via **Expo Location**
- 🖼️ Optimized image handling with **Expo Image** & image picker
- 💾 Persistent local storage with **AsyncStorage**
- 🌈 Linear gradients & blur effects
- 📳 Haptic feedback support
- 🗂️ Local data layer via `data/` folder

---

## 🛠️ Tech Stack

| Category        | Technology                        |
|-----------------|-----------------------------------|
| Framework       | React Native 0.81 + Expo 54      |
| Language        | TypeScript 5.9                    |
| Navigation      | Expo Router 6 (file-based)       |
| Icons           | Lucide React Native               |
| Server State    | TanStack React Query 5           |
| Client State    | Zustand 5                        |
| Storage         | AsyncStorage                      |
| UI Extras       | Linear Gradient, Blur, Haptics   |

---

## 📁 Project Structure

```
telehealthapp-1/
├── app/           # Screens & layouts (Expo Router file-based routing)
├── constants/     # App-wide constants (colors, config, etc.)
├── data/          # Local mock/static data
├── types/         # TypeScript type definitions
├── utils/         # Helper & utility functions
├── assets/        # Images, fonts, icons
├── app.json       # Expo configuration
├── package.json   # Dependencies
├── tsconfig.json  # TypeScript config
└── babel.config.js
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/)
- [Expo Go](https://expo.dev/go) app on your phone (for quick testing)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/zamanRaffi/telehealthapp-1.git
cd telehealthapp-1
```

2. **Install dependencies**

```bash
npm install
```

---

## ▶️ Running the App

### Start the development server

```bash
npx expo start
```

| Option           | How                          | Description               |
|------------------|------------------------------|---------------------------|
| Expo Go (phone)  | Scan QR code                 | Run on physical device    |
| Android Emulator | Press `a`                    | Requires Android Studio   |
| iOS Simulator    | Press `i`                    | Requires Xcode (macOS)    |
| Web Browser      | Press `w`                    | Run in browser            |

### Platform-specific commands

```bash
# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```

---

## 📦 Key Dependencies

### Core
```json
"expo": "~54.0.23"
"react": "19.1.0"
"react-native": "0.81.5"
"expo-router": "~6.0.13"
"typescript": "~5.9.2"
```

### UI & Icons
```json
"lucide-react-native": "^0.475.0"
"@expo/vector-icons": "^15.0.3"
"expo-linear-gradient": "~15.0.7"
"expo-blur": "~15.0.7"
"expo-image": "~3.0.10"
"react-native-svg": "15.12.1"
```

### State & Data
```json
"@tanstack/react-query": "^5.83.0"
"zustand": "^5.0.2"
"@react-native-async-storage/async-storage": "2.2.0"
```

### Navigation & Gestures
```json
"react-native-gesture-handler": "~2.28.0"
"react-native-screens": "~4.16.0"
"react-native-safe-area-context": "~5.6.0"
```

---

## 📜 License

This project is private. All rights reserved.
