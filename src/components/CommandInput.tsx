import React, { useState, useRef, useEffect } from 'react';
import { Terminal } from 'lucide-react';

const commands = [
  '/gamemode creative',
  '/give @p diamond_sword',
  '/time set day',
  '/weather clear',
  '/tp @p ~ ~ ~',
  '/effect give @p speed 60 2',
  '/summon creeper',
  '/setblock ~ ~ ~ stone',
  '/kill @e[type=zombie]',
];

const keywords = ['give', 'gamemode', 'time', 'weather', 'tp', 'effect', 'summon', 'setblock', 'kill'];

const CommandInput: React.FC = () => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const filtered = commands.filter(cmd => 
      cmd.toLowerCase().startsWith(input.toLowerCase()) && input.length > 0
    );
    setSuggestions(filtered);
    setShowSuggestions(filtered.length > 0 && input.length > 0);
  }, [input]);

  const highlightSyntax = (text: string) => {
    return text.split(' ').map((word, i) => {
      if (word.startsWith('@')) return <span key={i} className="syntax-player">{word}</span>;
      if (keywords.includes(word.replace('/', ''))) return <span key={i} className="syntax-keyword">{word}</span>;
      if (!isNaN(Number(word))) return <span key={i} className="syntax-number">{word}</span>;
      if (word.includes('_')) return <span key={i} className="syntax-string">{word}</span>;
      return <span key={i}>{word}</span>;
    }).reduce((prev, curr) => [prev, ' ', curr]);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <Terminal className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="command-input minecraft-font w-full px-10 py-3 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="/command"
          spellCheck="false"
        />
      </div>
      
      {showSuggestions && (
        <div className="absolute w-full mt-2 bg-gray-800 rounded-lg overflow-hidden shadow-xl border border-gray-700">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="suggestion minecraft-font text-white"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {highlightSyntax(suggestion)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommandInput;