import { v4 as uuidv4 } from 'uuid';

const games = {
  'Riding Extreme 3D': {
    appToken: 'd28721be-fd2d-4b45-869e-9f253b554e50',
    promoId: '43e35910-c168-4634-ad4f-52fd764a843f',
  },
  'Chain Cube 2048': {
    appToken: 'd1690a07-3780-4068-810f-9b5bbf2931b2',
    promoId: 'b4170868-cef0-424f-8eb9-be0622e8e8e3',
  },
  'My Clone Army': {
    appToken: '74ee0b5b-775e-4bee-974f-63e7f4d5bacb',
    promoId: 'fe693b26-b342-4159-8808-15e3ff7f8767',
  },
  'Train Miner': {
    appToken: '82647f43-3f87-402d-88dd-09a90025313f',
    promoId: 'c4480ac7-e178-4973-8061-9ed5b2e17954',
  },
};

const EVENTS_DELAY = 20000;

function generateClientId() {
  const timestamp = Date.now();
  const randomNumbers = Array.from({ length: 19 }, () => Math.floor(Math.random() * 10)).join('');
  return `${timestamp}-${randomNumbers}`;
}

async function login(clientId, appToken) {
  const response = await fetch('https://api.gamepromo.io/promo/login-client', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ appToken, clientId, clientOrigin: 'deviceid' }),
  });
  if (!response.ok) throw new Error('Login failed');
  const data = await response.json();
  return data.clientToken;
}

async function emulateProgress(clientToken, promoId) {
  const response = await fetch('https://api.gamepromo.io/promo/register-event', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${clientToken}`,
    },
    body: JSON.stringify({ promoId, eventId: uuidv4(), eventOrigin: 'undefined' }),
  });
  if (!response.ok) throw new Error('Failed to emulate progress');
  const data = await response.json();
  return data.hasCode;
}

async function generateKeyFromApi(clientToken, promoId) {
    const response = await fetch('https://api.gamepromo.io/promo/create-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${clientToken}`,
      },
      body: JSON.stringify({ promoId }),
    });
    if (!response.ok) throw new Error('Failed to generate key');
    const data = await response.json();
    return data.promoCode;
  }
  
  export async function generateKey(gameName) {
    const game = games[gameName];
    if (!game) throw new Error('Invalid game name');
  
    const clientId = generateClientId();
    const clientToken = await login(clientId, game.appToken);
  
    for (let i = 0; i < 11; i++) {
      await new Promise(resolve => setTimeout(resolve, EVENTS_DELAY * (Math.random() / 3 + 1)));
      try {
        const hasCode = await emulateProgress(clientToken, game.promoId);
        if (hasCode) break;
      } catch (error) {
        console.error('Error during progress emulation:', error);
      }
    }
  
    return generateKeyFromApi(clientToken, game.promoId);
  }