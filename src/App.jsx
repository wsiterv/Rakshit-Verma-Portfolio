import React, { useState } from 'react';
import Navbar from './Nav';
import Gui from './Gui';
import RakshitTerminal from './Cli';

export default function App() {
  const [mode, setMode] = useState('gui');

  const handleModeChange = (newMode) => {
    setMode(newMode);
  };

  return (
    <div className="min-h-screen">
      <Navbar currentMode={mode} onModeChange={handleModeChange} />
      
      {mode === 'gui' ? (
        <Gui />
      ) : (
        <div className="bg-gray-900 min-h-screen text-green-400 font-mono p-4">
          <RakshitTerminal />
        </div>
      )}
    </div>
  );
}