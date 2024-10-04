import { useEffect } from 'react';

export function useNotification() {
  useEffect(() => {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  const emitNotification = (notificationMessage, options = {
    icon: '/bate-papo.png',}) => {
    if (Notification.permission === 'granted') {
      new Notification(notificationMessage, options);
    }
  };

  return { emitNotification };
}
