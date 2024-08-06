import { useState } from 'react';
import { generateKey } from '../lib/gameUtils';

export default function GameSection({ game }) {
  const [generatedCodes, setGeneratedCodes] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (generatedCodes.length >= game.maxCodes) {
      alert('You have reached the maximum number of codes for today.');
      return;
    }

    setIsGenerating(true);
    try {
      const newCode = await generateKey(game.name);
      setGeneratedCodes([...generatedCodes, newCode]);
    } catch (error) {
      console.error('Error generating code:', error);
      alert('Failed to generate code. Please try again later.');
    }
    setIsGenerating(false);
  };

  return (
    <div className="game-section">
      <img src={game.image} alt={game.name} />
      <h2>{game.name}</h2>
      <p>Available codes: {generatedCodes.length}/{game.maxCodes}</p>
      <button onClick={handleGenerate} disabled={isGenerating}>
        {isGenerating ? 'Generating...' : 'Generate Code'}
      </button>
      <div className="generated-codes">
        {generatedCodes.map((code, index) => (
          <p key={index}>{code}</p>
        ))}
      </div>
    </div>
  );
}