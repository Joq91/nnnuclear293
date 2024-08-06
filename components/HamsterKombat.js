import { useState } from 'react';
import GameSection from './GameSection';

const games = [
  { name: 'Riding Extreme 3D', image: '/images/riding-extreme.jpg', maxCodes: 4 },
  { name: 'Chain Cube 2048', image: '/images/chain-cube.jpg', maxCodes: 4 },
  { name: 'My Clone Army', image: '/images/clone-army.jpg', maxCodes: 4 },
  { name: 'Train Miner', image: '/images/train-miner.jpg', maxCodes: 4 },
];

export default function HamsterKombat() {
  return (
    <div>
      {games.map((game, index) => (
        <GameSection key={index} game={game} />
      ))}
    </div>
  );
}