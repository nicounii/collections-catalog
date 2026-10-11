import { useSyncExternalStore } from 'react';

// Minimal hash router: the app has no router dependency, so we subscribe to
// the URL fragment directly. SSR-safe (getServerSnapshot returns '').
function subscribe(callback) {
  window.addEventListener('hashchange', callback);
  return () => window.removeEventListener('hashchange', callback);
}

function getSnapshot() {
  return window.location.hash;
}

function getServerSnapshot() {
  return '';
}

export function useHashRoute() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
