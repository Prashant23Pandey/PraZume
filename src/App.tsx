import React from 'react';
import { ResumeProvider, useResumeStore } from './context/ResumeContext';
import { LandingPage } from './components/landing/LandingPage';
import { BuilderLayout } from './components/builder/BuilderLayout';
import { CreatorModal } from './components/creator/CreatorModal';

const AppContent: React.FC = () => {
  const { activeView } = useResumeStore();

  return (
    <div className="h-full w-full">
      {activeView === 'landing' ? <LandingPage /> : <BuilderLayout />}
      <CreatorModal />
    </div>
  );
};

export function App() {
  return (
    <ResumeProvider>
      <AppContent />
    </ResumeProvider>
  );
}

export default App;

