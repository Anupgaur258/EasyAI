import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustSection from './components/TrustSection';
import WorkflowSection from './components/WorkflowSection';
import Meeting from './pages/Meeting';
import CollaborativeTool from './pages/CollaborativeTool';
import AICodeReviewer from './pages/AICodeReviewer';
import AIShortVideoGenerator from './pages/AIShortVideoGenerator';
import LearnEnglish from './pages/LearnEnglish';
import AIImageCreation from './pages/AIImageCreation';
import AutomateWork from './pages/AutomateWork';

function App() {
  return (
    <div className="min-h-screen bg-darkBg text-white">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Hero />
              <TrustSection />
              <WorkflowSection />
            </>
          }
        />
        <Route path="/meeting" element={<Meeting />} />
        <Route path="/collaborative-tool" element={<CollaborativeTool />} />
        <Route path="/ai-code-reviewer" element={<AICodeReviewer />} />
        <Route path="/ai-short-video-generator" element={<AIShortVideoGenerator />} />
        <Route path="/learn-english" element={<LearnEnglish />} />
        <Route path="/ai-image-creation" element={<AIImageCreation />} />
        <Route path="/automate-work" element={<AutomateWork />} />
      </Routes>
    </div>
  );
}

export default App;