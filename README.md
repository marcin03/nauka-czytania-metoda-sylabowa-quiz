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

## Gamification System (Worlds & Rewards)

This application incorporates a gamification system designed to motivate children through thematic worlds and visual rewards.

### How Worlds Work:

-   **Thematic Progression:** Instead of traditional levels, children progress through themed "worlds" (e.g., Las, Kosmos, Zamek). Each world contains a specific set of syllables to learn and a required number of sessions to complete.
-   **Unlocking Worlds:** Children start with the first world unlocked. Completing all required sessions in a world unlocks the next world in the sequence. There is no concept of "losing"; progress is always forward.
-   **World Selection:** From the main menu, navigate to "Wybierz Świat" (Select World) to see all available worlds. Unlocked worlds can be chosen to start a learning or quiz session.

### Session Completion & Rewards:

-   **Session Rewards:** After completing a learning or quiz session (a fixed number of syllables within a world), a celebration screen appears. Children receive a generic reward (e.g., a "Naklejka Gwiazdka" / Star Sticker) for every completed session.
-   **World Completion Rewards:** Upon completing all required sessions within a world, a special unique reward for that world is unlocked (e.g., "Leśna Odznaka" / Forest Badge).
-   **My Rewards View:** You can view all collected rewards by clicking "Zobacz Moje Nagrody" (See My Rewards) from the world selection screen.

### Adding New Worlds or Rewards:

The data for worlds and rewards is centrally managed in `src/data/gamificationData.ts`.

#### To Add a New World:

1.  **Define Syllables:** Ensure you have enough syllables defined in `src/data/syllables.ts` with unique `id`s for your new world.
2.  **Prepare Visual Assets:** Create an image for your world (e.g., `my_new_world.svg` or `.png`) and place it in the `public/images/worlds/` directory.
3.  **Define World Reward:** Decide what reward children will receive for completing this new world. You might need to add a new reward first (see below).
4.  **Update `src/data/gamificationData.ts`:**
    -   Add a new `World` object to the `WORLDS` array.
    -   Assign a unique `id`, a `name`, `description`, and the `image` path.
    -   Crucially, provide an array of `syllableIds` that belong to this world. These IDs must correspond to `id`s in `ALL_SYLLABLES` from `src/data/syllables.ts`.
    -   Specify `requiredSessionsToComplete` (e.g., 3).
    -   Set the `rewardId` (from your `REWARDS` list).
    -   If this world leads to another, set `nextWorldId` to the ID of the subsequent world.

    Example:
    ```typescript
    export const WORLDS: World[] = [
      // ... existing worlds
      {
        id: 'ocean',
        name: 'Ocean',
        description: 'Zanurkuj w oceanie sylab!',
        image: '/images/worlds/ocean.svg',
        syllableIds: [31, 32, 33, 34, 35, 36, 49, 50, 51, 52], // Example syllable IDs
        requiredSessionsToComplete: 4,
        rewardId: 'ocean-shell',
        // nextWorldId: 'another-world-id' // Optional
      },
    ];
    ```

#### To Add a New Reward:

1.  **Prepare Visual Assets:** Create an image for your reward (e.g., `my_new_reward.svg` or `.png`) and place it in the `public/images/rewards/` directory.
2.  **Update `src/data/gamificationData.ts`:**
    -   Add a new `Reward` object to the `REWARDS` array.
    -   Assign a unique `id`, a `name`, and the `image` path.

    Example:
    ```typescript
    export const REWARDS: Reward[] = [
      // ... existing rewards
      { id: 'ocean-shell', name: 'Morska Muszelka', image: '/images/rewards/ocean-shell.svg' },
    ];
    ```