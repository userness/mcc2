import React from 'react';
import { Terminal } from 'lucide-react';
import CommandInput from './components/CommandInput';

function App() {
  return (
    <div 
      className="min-h-screen flex flex-col items-center bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1607988795691-3d0147b43231?auto=format&fit=crop&q=80&w=1920)',
      }}
    >
      <div className="w-full min-h-screen backdrop-blur-sm bg-black/50 flex flex-col items-center">
        <div className="flex items-center space-x-3 mt-20 mb-8">
          <Terminal className="text-emerald-400" size={32} />
          <h1 className="minecraft-font text-3xl text-white">Minecraft Command Helper</h1>
        </div>
        
        <div className="w-full max-w-4xl px-4">
          <CommandInput />
          
          <div className="mt-8 bg-black/60 p-6 rounded-lg">
            <h2 className="minecraft-font text-xl text-white mb-4">Quick Tips</h2>
            <ul className="minecraft-font text-sm space-y-2">
              <li className="text-emerald-400">Start typing a command to see suggestions</li>
              <li className="text-yellow-400">Click any suggestion to auto-complete</li>
              <li className="text-blue-400">Commands are syntax highlighted for better readability</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;