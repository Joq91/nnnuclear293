export function checkSubscription() {
    // This function should interact with the Telegram Web App API
    // to check if the user is subscribed to the developer's channel
    // For now, we'll return a mock result
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 1000);
    });
  }
  
  export function initTelegramApp() {
    if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
    }
  }
  
  export function getUserInfo() {
    if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
      return window.Telegram.WebApp.initDataUnsafe.user;
    }
    return null;
  }