import { Route, Routes, Link, useLocation } from 'react-router-dom';
import MainMenu from './pages/MainMenu';
import LearningMode from './pages/LearningMode';
import QuizMode from './pages/QuizMode';
import Settings from './pages/Settings';
import WorldSelection from './pages/WorldSelection';
import RewardsView from './pages/RewardsView';
import SessionCompletionScreen from './components/SessionCompletionScreen'; // Import SessionCompletionScreen
import useGameStore from './store/useGameStore';
import { SessionCompletionDetails } from './types'; // Import SessionCompletionDetails type

function App() {
  const gameMode = useGameStore((state) => state.gameMode);
  const location = useLocation(); // Use useLocation hook

  // Extract details from location state for SessionCompletionScreen
  const sessionCompletionDetails = location.state?.details as SessionCompletionDetails | undefined;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#e0f2fe', color: '#333', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <nav style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
        <Link to="/settings" style={{ fontSize: '1.5rem' }}>⚙️</Link>
      </nav>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/learn" element={<LearningMode />} />
        <Route path="/quiz" element={<QuizMode />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/worlds" element={<WorldSelection />} />
        <Route path="/rewards" element={<RewardsView />} />
        <Route path="/session-complete" element={
          sessionCompletionDetails ? (
            <SessionCompletionScreen details={sessionCompletionDetails} />
          ) : (
            <MainMenu /> // Redirect to main menu if no details
          )
        } />
      </Routes>
    </div>
  );
}

export default App;