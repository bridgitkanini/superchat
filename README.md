# SuperChat Application Overview

## Main Features

- **Google Authentication**: Users sign in with their Google account using Firebase Authentication.
- **Real-time Chat**: Authenticated users can send and receive messages in real-time, powered by Firebase Firestore and `react-firebase-hooks`.
- **Message Display**: Each message displays the sender's avatar and message text. Messages are styled differently depending on whether they are sent or received.
- **Sign Out**: Users can sign out at any time.
- **Profanity Filtering**: A Firebase Cloud Function automatically checks new messages for profanity. If detected, the message is censored and the user is added to a "banned" list in Firestore.

## Code Structure

- **Frontend (`src/`)**

  - `App.tsx`: Main React component. Handles authentication, chat UI, and message sending.
  - `App.css`, `index.css`: Styling for the app.
  - No routing; all functionality is on a single page.

- **Backend/Serverless (`functions/`)**
  - `src/index.ts`: Contains a Cloud Function (`detectEvilUsers`) that filters profane messages and bans users who use profanity.

## How it Works

1. **Sign In**: User clicks "Sign in with Google" and authenticates.
2. **Chat Room**: User can send messages. Messages are stored in Firestore and displayed in real-time.
3. **Profanity Detection**: When a message is sent, a Cloud Function checks for bad words. If found, the message is censored and the user is banned.
4. **Sign Out**: User can sign out, returning to the sign-in screen.

---

This project is a minimal real-time chat app with authentication and basic moderation, built with React, TypeScript, Vite, and Firebase.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
