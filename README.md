# 🌸 Pink Notes App

A beautiful, feature-rich notes application built with React Native and Expo. Organize your thoughts with a stunning Pinterest-style masonry layout and 10 gorgeous pastel color themes.

## ✨ Features

- **📌 Pinterest-Style Masonry Layout** - Beautiful, responsive note display with automatic column arrangement
- **🎨 10 Pastel Color Options** - Choose from 10 stunning pastel themes to personalize your notes:
  - Soft Pink
  - Lavender
  - Mint Green
  - Peachy Orange
  - Sky Blue
  - Butter Yellow
  - Rose
  - Lilac
  - Sage Green
  - Coral

- **🔍 Smart Search** - Quickly find notes by title or content
- **✏️ Edit Notes** - Long press to edit your notes with ease
- **🗑️ Delete Notes** - Long press to remove unwanted notes
- **💾 Persistent Storage** - AsyncStorage keeps your notes safe between sessions
- **↻ Pull-to-Refresh** - Quick refresh to reload your notes
- **⚡ Fast & Responsive** - Built with TypeScript for type safety and better performance
- **📱 Cross-Platform** - Works seamlessly on iOS and Android

## 🛠️ Tech Stack

- **React Native** - Mobile app framework
- **Expo** - Simplified React Native development
- **TypeScript** - Type-safe JavaScript
- **React Hooks** - State management (useState, useContext, useEffect)
- **AsyncStorage** - Local data persistence
- **Expo Router** - File-based routing (Tabs layout)
- **StyleSheet** - React Native styling

## 📋 Project Structure

```
notesappforme/
├── app/
│   └── (tabs)/
│       ├── _layout.tsx       # Tab navigation layout
│       ├── index.tsx         # Notes list view (home tab)
│       └── add.tsx           # Add/edit notes screen
├── components/
│   ├── NoteCard.tsx          # Individual note component
│   └── ui/
│       ├── collapsible.tsx
│       ├── icon-symbol.tsx
│       └── icon-symbol.ios.tsx
├── constants/
│   └── Colors.ts             # Color palette definitions
├── hooks/
│   ├── useNotes.ts           # Custom hook for note operations
│   ├── use-color-scheme.web.ts
│   └── use-theme-color.ts
├── assets/
│   └── images/               # App images and icons
├── app.json                  # Expo configuration
├── package.json              # Dependencies
└── tsconfig.json             # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- Expo CLI: `npm install -g expo-cli`
- A mobile device or emulator for testing

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Riya160200/Notes-app-first-year.git
   cd Notes-app-first-year/notesappforme
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the Expo development server:**
   ```bash
   npx expo start
   ```

4. **Run on your device:**
   - **iOS**: Press `i` to open in iOS Simulator
   - **Android**: Press `a` to open in Android Emulator
   - **Mobile Device**: Scan the QR code with Expo Go app

## 📖 Usage Guide

### Creating a Note

1. Navigate to the **Add** tab
2. Enter your note title and content
3. Select a pastel color theme
4. Tap **Save** to create your note

### Viewing Notes

1. Go to the **Home** tab to see all your notes
2. Notes are displayed in a beautiful masonry layout
3. Pull down to refresh your notes list

### Editing a Note

1. Long press on any note card in the masonry layout
2. Select **Edit** from the options
3. Modify the title, content, or color
4. Tap **Update** to save changes

### Deleting a Note

1. Long press on the note you want to delete
2. Select **Delete** from the options
3. Confirm the deletion

### Searching Notes

1. Use the search bar at the top of the home screen
2. Type keywords to filter notes by title or content
3. Results update in real-time

## 🎨 Customization

### Adding New Colors

Edit [constants/Colors.ts](constants/Colors.ts) to add or modify pastel color options:

```typescript
export const PASTEL_COLORS = {
  pink: '#FFB3D9',
  lavender: '#E6B3F5',
  // ... add more colors
};
```

### Modifying Layout

Adjust the masonry column layout in the home screen to change the number of columns or spacing.

## 💾 Data Storage

All notes are stored locally using **AsyncStorage**. Data persists between app sessions:
- Automatic saving on note creation/update
- Automatic removal on note deletion
- Data remains even after app closure

## 🐛 Troubleshooting

**Notes not loading?**
- Clear AsyncStorage cache and restart the app
- Check device storage space

**Color not displaying correctly?**
- Verify color hex codes in [constants/Colors.ts](constants/Colors.ts)
- Rebuild the app: `npx expo start --clear`

**Search not working?**
- Ensure you have notes created
- Check search query formatting

## 📦 Available Scripts

```bash
# Start development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run linter
npm run lint

# TypeScript type checking
npx tsc --noEmit
```

## 🔄 Updates & Future Features

- Cloud sync with Firebase
- Note categories and tags
- Dark mode theme
- Note sharing functionality
- Voice-to-text notes
- Image attachments

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📞 Support

For issues or questions, please open an issue on [GitHub](https://github.com/Riya160200/Notes-app-first-year/issues).

---

**Made with ❤️ using React Native & Expo**

Happy note-taking! 🎉
