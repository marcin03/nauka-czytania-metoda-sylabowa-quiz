# Nauka Czytania - Metoda Sylabowa Quiz

This is a React + TypeScript + Vite application designed to help children (~5 years old) learn Polish syllables using a fun and interactive game.

## Features:

-   **Main Menu:** Allows users to select specific consonants to practice, and navigate to different game modes or settings.
-   **Learning Mode:** Displays and plays the audio of syllables using provided audio files, automatically advancing after a configurable delay or manually by pressing the space bar.
-   **Quiz Mode:** Plays the audio of a syllable using provided audio files and presents three visual options for the child to choose from, providing immediate feedback.
-   **Configurable Settings:** Adjust the number of syllables per session and the delay between syllables in learning mode.
-   **Child-Friendly UI:** Basic, unstyled components ready for custom CSS to achieve a colorful and engaging design suitable for young children.
-   **State Management:** Powered by Zustand for a streamlined and efficient state.

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

Make sure you have Node.js and npm (or Yarn/pnpm) installed on your system.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://git_moje_projekty/nauka-czytania-metoda-sylabowa-quiz.git
    cd nauka-czytania-metoda-sylabowa-quiz
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the Application

To start the development server:

```bash
npm run dev
```

This will typically open the application in your browser at `http://localhost:5173/`.

**Important: Audio Files are User-Provided!**
This application is designed to work with audio files for syllables. Placeholder `audioUrl` entries are present in `src/data/syllables.ts`, but no actual audio files are included.
To enable audio playback:
1.  **Create a directory:** Make a new directory `public/audio/` in your project root (if it doesn't exist).
2.  **Add audio files:** Place your `.mp3` (or other supported audio format) files for each syllable into this `public/audio/` directory. Ensure the file names are descriptive (e.g., `ba.mp3`, `ma.mp3`).
3.  **Update `src/data/syllables.ts`:** For each syllable object, update the `audioUrl` property to point to the correct path of its corresponding audio file (e.g., `audioUrl: '/audio/ba.mp3'`).

### Running Tests

To run the unit tests:

```bash
npm run test
```

### Building for Production

To build the application for production:

```bash
npm run build
```

The compiled output will be in the `dist/` directory.

## Configuration and Settings

From the main menu, click on the gear icon (⚙️) to access the settings panel. Here you can:

-   **Number of Syllables per Session:** Adjust how many syllables are presented in a single learning or quiz session (default: 5, range: 2-20).
-   **Learning Mode Delay:** Set the time (in seconds) the application waits before advancing to the next syllable in Learning Mode (default: 3s, range: 1-9s).

You can also select which consonants to practice directly from the main menu.

## Adding More Syllables

To extend the game with more Polish syllables:

1.  **Prepare Audio Files (if desired):**
    -   Record or obtain audio files for your new syllables.
    -   Place these `.mp3` (or other supported audio format) files in the `public/audio/` directory. Ensure the file names are descriptive (e.g., `ma.mp3`, `kot.mp3`).

2.  **Update `src/data/syllables.ts`:**
    -   Open the `src/data/syllables.ts` file.
    -   Add new `Syllable` objects to the `ALL_SYLLABLES` array. Each object should have:
        -   `id`: A unique number.
        -   `text`: The syllable text (e.g., 'MA').
        -   `consonant`: The initial consonant in the syllable (e.g., 'M'). This is used for filtering.
        -   `audioUrl` (optional): The path to your audio file, relative to the `public/` directory (e.g., `/audio/ma.mp3`).

    Example:
    ```typescript
    export const ALL_SYLLABLES: Syllable[] = [
      // ... existing syllables
      { id: 101, text: 'LA', consonant: 'L', audioUrl: '/audio/la.mp3' }, // With audio
      { id: 102, text: 'LO', consonant: 'L' }, // Without audio
    ];
    ```

3.  **Run the application:** The new syllables will be available in the game immediately.

## Customizing Styling

This application currently uses inline styles for basic layout. To achieve a child-friendly, colorful, and engaging design, you will need to add custom CSS.

1.  **Create `src/App.css` (or similar):**
    -   You can create a CSS file (e.g., `src/App.css`) and import it into `src/App.tsx`.
    -   Define your styles using standard CSS rules, targeting elements by their HTML tags, custom class names, or IDs.

2.  **Apply Class Names:**
    -   Modify the components (`App.tsx`, `MainMenu.tsx`, etc.) to add `className` attributes to your HTML elements (e.g., `<div className="main-container">`).
    -   Define the corresponding CSS rules in your CSS file.

## Project Structure

```
├── public/                 # Public assets
│   └── audio/              # [User-provided] Audio files for syllables
├── src/
│   ├── components/         # Reusable React components
│   ├── data/               # Syllable data (now using CONSONANTS)
│   ├── hooks/              # Custom React hooks (e.g., useAudioPlayer)
│   ├── lib/                # Utility functions or helper modules
│   ├── pages/              # Main application pages (MainMenu, LearningMode, QuizMode, Settings)
│   ├── store/              # Zustand store for global state
│   ├── types/              # TypeScript type definitions (now using 'consonant')
│   ├── App.tsx             # Main application component with routing
│   ├── index.css           # Global styles (currently empty, ready for custom CSS)
│   ├── main.tsx            # Application entry point
│   └── tests/              # Unit tests (Vitest + React Testing Library)
├── tsconfig.json           # TypeScript configuration
├── vite.config.js           # Vite build and development configuration (including Vitest setup)
└── package.json            # Project dependencies and scripts
```
