# SuperChat

A modern, real-time chat application built with React, TypeScript, Vite, and Firebase. SuperChat provides a seamless messaging experience with Google authentication and real-time message synchronization.

## 🌟 Features

- **Modern Tech Stack**: Built with React 19, TypeScript, Vite, and TailwindCSS
- **Responsive Design**: Works on both desktop and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Type Safety**: Full TypeScript support for better developer experience
- **Google Authentication**: Users sign in with their Google account using Firebase Authentication.
- **Real-time Chat**: Authenticated users can send and receive messages in real-time, powered by Firebase Firestore and `react-firebase-hooks`.
- **Message Display**: Each message displays the sender's avatar and message text. Messages are styled differently depending on whether they are sent or received.
- **Sign Out**: Users can sign out at any time.
- **Profanity Filtering**: A Firebase Cloud Function automatically checks new messages for profanity. If detected, the message is censored and the user is added to a "banned" list in Firestore.

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- pnpm (v8 or later)
- Firebase account and project setup

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/bridgitkanini/superchat.git
   cd superchat
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up Firebase:
   - Create a new Firebase project
   - Enable Google Authentication
   - Set up a Firestore database
   - Create a `.env` file with your Firebase config:
     ```
     VITE_FIREBASE_API_KEY=your-api-key
     VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
     VITE_FIREBASE_PROJECT_ID=your-project-id
     VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
     VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
     VITE_FIREBASE_APP_ID=your-app-id
     ```

### Available Scripts

- `pnpm dev`: Start development server
- `pnpm build`: Build for production
- `pnpm preview`: Preview production build
- `pnpm lint`: Run ESLint

## 🏗️ Project Structure

```
superchat/
├── public/            # Static files
├── src/
│   ├── assets/        # Images and other static assets
│   ├── components/    # Reusable UI components
│   │   └── ui/        # Base UI components (Button, Card, Input)
│   ├── lib/           # Utility functions and Firebase config
│   ├── App.tsx        # Main application component
│   ├── ChatRoomPage.tsx # Chat room implementation
│   ├── Landing.tsx    # Landing page with sign-in
│   └── main.tsx       # Application entry point
├── functions/         # Firebase Cloud Functions
├── .eslintrc.js       # ESLint configuration
├── tailwind.config.js # Tailwind CSS configuration
├── tsconfig.json      # TypeScript configuration
└── vite.config.ts     # Vite configuration
```

## 🔧 Technologies Used

- **Frontend**:
  - React 19
  - TypeScript
  - Vite
  - TailwindCSS
  - Radix UI Primitives
  - Lucide Icons

- **Backend**:
  - Firebase Authentication
  - Cloud Firestore
  - Firebase Hosting
  - Firebase Cloud Functions

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by [Your Name]

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
