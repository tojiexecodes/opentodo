# 📝 TaskMaster: Todo\!

A sleek, **Local-First** mobile task management application built with **React Native** and **Expo**. Designed for speed and privacy, your data never leaves your device.

## 🚀 Features

  * **Offline-First**: Powered by **Expo SQLite** and **Zustand** for lightning-fast performance without needing an internet connection.
  * **Haptic Feedback**: Premium tactile experience using **Expo Haptics** for interactions.
  * **Task Management**: Create, edit, delete, and toggle tasks with a modern, "bento-box" inspired UI.
  * **Persistent Storage**: Automatic data persistence—your tasks remain even after closing the app.
  * **Responsive Design**: Fully optimized for iOS and Android with a native-feel interface.

-----

## 🛠️ Tech Stack

  * **Framework**: [Expo SDK 55](https://expo.dev/) (React Native 0.83)
  * **State Management**: [Zustand](https://github.com/pmndrs/zustand) (with Persist middleware)
  * **Database**: [Expo SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/)
  * **Navigation**: [Expo Router v55](https://docs.expo.dev/router/introduction/)
  * **Feedback**: [Expo Haptics](https://docs.expo.dev/versions/latest/sdk/haptics/)
  * **Icons**: [AntDesign](https://icons.expo.fyi/) / [Ionicons](https://ionicons.com/)

-----

## 📦 Getting Started

### 1\. Prerequisites

Ensure you have the following installed:

  * **Node.js**: 18.x or newer (LTS recommended)
  * **Expo Go**: App installed on your [iOS](https://www.google.com/search?q=https://apps.apple.com/app/expo-go/id982107779) or [Android](https://play.google.com/store/apps/details?id=host.exp.exponent) device.

### 2\. Installation

```bash
# Clone the repository
git clone https://github.com/tojiexecodes/todo!.git

# Navigate into the project directory
cd todo!

# Install dependencies
npm install
```

### 3\. Running the App

```bash
npx expo start
```

  * **Physical Device**: Scan the QR code with the **Expo Go** app (Android) or **Camera** (iOS).
  * **Simulators**: Press **`i`** for iOS or **`a`** for Android.
  * **Clear Cache**: If you face issues, run `npx expo start -c`.

-----

## 🏗️ Project Structure

```text
├── app/               # Expo Router pages (index, home, today, modal)
├── assets/            # Images, splash screen, and icons
├── components/        # Reusable UI components
├── store/             # Zustand store logic & SQLite persistence
└── scripts/           # Maintenance and reset scripts
```

-----

## 🤝 Contributing

1.  Fork the project.
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.