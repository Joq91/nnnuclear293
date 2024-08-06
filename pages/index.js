import { useState, useEffect } from 'react';
import TapSwap from '../components/TapSwap';
import HamsterKombat from '../components/HamsterKombat';
import { checkSubscription } from '../lib/telegram';

export default function Home() {
  const [activeTab, setActiveTab] = useState('tapswap');
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    checkSubscription().then(setIsSubscribed);
  }, []);

  if (!isSubscribed) {
    return <div>Пожалуйста, подпишитесь на канал разработчика для продолжения.</div>;
  }

  return (
    <div>
      {activeTab === 'tapswap' ? <TapSwap /> : <HamsterKombat />}
      <nav>
        <button onClick={() => setActiveTab('tapswap')}>TapSwap</button>
        <button onClick={() => setActiveTab('hamsterkombat')}>Hamster Kombat</button>
      </nav>
    </div>
  );
}