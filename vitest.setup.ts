import "@testing-library/jest-dom/vitest";

// shortcut: this jsdom/vitest version combo leaves window.localStorage undefined
// even with storageQuota set — polyfill the small subset lib/theme.ts actually uses.
if (typeof window !== "undefined" && !window.localStorage) {
  const store = new Map<string, string>();
  const polyfill: Pick<Storage, "getItem" | "setItem" | "removeItem" | "clear"> = {
    getItem: (key) => store.get(key) ?? null,
    setItem: (key, value) => store.set(key, value),
    removeItem: (key) => store.delete(key),
    clear: () => store.clear(),
  };
  Object.defineProperty(window, "localStorage", { value: polyfill, configurable: true });
  Object.defineProperty(globalThis, "localStorage", { value: polyfill, configurable: true });
}
