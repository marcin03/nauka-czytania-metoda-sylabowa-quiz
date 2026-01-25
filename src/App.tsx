import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MainMenu from './pages/MainMenu';
import LearningMode from './pages/LearningMode';
import QuizMode from './pages/QuizMode';
import Settings from './pages/Settings';
import useGameStore from './store/useGameStore';

function App() {
  const gameMode = useGameStore((state) => state.gameMode);

  return (
    <Router>
      <div style={{ minHeight: '100vh', backgroundColor: '#e0f2fe', color: '#333', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
        <nav style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
          <Link to="/settings" style={{ fontSize: '1.5rem' }}>⚙️</Link>
        </nav>
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/learn" element={<LearningMode />} />
          <Route path="/quiz" element={<QuizMode />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;