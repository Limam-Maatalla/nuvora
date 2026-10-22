export function getStored(key, fallback) {
  try { const value = localStorage.getItem(key); return value === null ? fallback : JSON.parse(value); }
  catch { return fallback; }
}
export function setStored(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage may be disabled */ }
}
export function updateStoredArray(key, updater) {
  const current = getStored(key, []); const next = updater(Array.isArray(current) ? current : []); setStored(key, next); return next;
}