import React from 'react';
import { CommandSuggestion } from '../types/commands';

interface SuggestionProps {
  suggestion: CommandSuggestion;
  onClick: (text: string) => void;
}

const Suggestion: React.FC<SuggestionProps> = ({ suggestion, onClick }) => {
  const getTypeStyle = (type: CommandSuggestion['type']) => {
    switch (type) {
      case 'player': return 'text-cyan-400';
      case 'number': return 'text-pink-400';
      case 'string': return 'text-yellow-400';
      case 'keyword': return 'text-green-400';
      default: return 'text-white';
    }
  };

  return (
    <div
      className="suggestion minecraft-font flex justify-between items-center"
      onClick={() => onClick(suggestion.text)}
    >
      <span className={getTypeStyle(suggestion.type)}>{suggestion.text}</span>
      {suggestion.description && (
        <span className="text-gray-500 text-sm">{suggestion.description}</span>
      )}
    </div>
  );
};

export default Suggestion;