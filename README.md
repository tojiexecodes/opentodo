# 📝 TaskMaster: opentodo

A sleek, **Local-First** mobile task management application built with **React Native** and **Expo**. Designed for speed and privacy, your data never leaves your device.

## 📱 Product Demo

| Landing | Dashboard | Task List | Create Task |
| :---: | :---: | :---: | :---: |
| <img src="https://raw.githubusercontent.com/tojiexecodes/todo%21/main/assets/images/Landing.jpg" width="200" /> | <img src="https://raw.githubusercontent.com/tojiexecodes/todo%21/main/assets/images/home.jpg" width="200" /> | <img src="https://raw.githubusercontent.com/tojiexecodes/todo%21/main/assets/images/list.jpg" width="200" /> | <img src="https://raw.githubusercontent.com/tojiexecodes/todo%21/main/assets/images/Create-todo.jpg" width="200" /> |

---

## 🚀 Features

* **Offline-First**: Powered by **Expo SQLite** and **Zustand** for lightning-fast performance without needing an internet connection.
* **Haptic Feedback**: Premium tactile experience using **Expo Haptics** for interactions.
* **Task Management**: Create, edit, delete, and toggle tasks with a modern, "bento-box" inspired UI.
* **Persistent Storage**: Automatic data persistence—your tasks remain even after closing the app.
* **Responsive Design**: Fully optimized for iOS and Android with a native-feel interface.

---

## 🛠️ Tech Stack

* **Framework**: [Expo SDK 55](https://expo.dev/)
* **State Management**: [Zustand](https://github.com/pmndrs/zustand) (with Persist middleware)
* **Database**: [Expo SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/)
* **Navigation**: [Expo Router v55](https://docs.expo.dev/router/introduction/)
* **Feedback**: [Expo Haptics](https://docs.expo.dev/versions/latest/sdk/haptics/)
* **Icons**: [AntDesign](https://icons.expo.fyi/) / [Ionicons](https://ionicons.com/)

---

## 📦 Getting Started

### 1. Installation

```bash
# Clone the repository
git clone https://github.com/tojiexecodes/openhtodo.git

# Navigate into the project directory
cd opentodo

# Install dependencies
npm install
```

### 2. Running the App

```bash
npx expo start
```

* Scan the **QR code** with your Expo Go app (Android) or Camera (iOS).
* Press **`i`** for iOS simulator or **`a`** for Android emulator.

---

## 🏗️ Project Structure

```text
├── app/               # Expo Router pages (index, home, today, modal)
├── assets/            # Images, screenshots, and icons
├── components/        # Reusable UI components
├── store/             # Zustand store logic & SQLite persistence
└── scripts/           # Maintenance and reset scripts
```

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.
