import '@testing-library/jest-dom/vitest';

// Node 26 exposes an incomplete experimental localStorage global unless it is
// launched with --localstorage-file. Use a browser-compatible in-memory store
// for tests instead of coupling the suite to a Node command-line flag.
const values = new Map();

const localStorage = {
  clear() {
    values.clear();
  },
  getItem(key) {
    const normalizedKey = String(key);
    return values.has(normalizedKey) ? values.get(normalizedKey) : null;
  },
  key(index) {
    return Array.from(values.keys())[index] ?? null;
  },
  get length() {
    return values.size;
  },
  removeItem(key) {
    values.delete(String(key));
  },
  setItem(key, value) {
    values.set(String(key), String(value));
  },
};

Object.defineProperty(window, 'localStorage', {
  configurable: true,
  value: localStorage,
});
