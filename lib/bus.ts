// Tiny cross-component event bus (window CustomEvents) — keeps the rail, hero cards,
// canvas and terminal decoupled without a state library.
export type BusEvent = "open-demo" | "open-project" | "toggle-terminal" | "focus-ask";

export const emit = (name: BusEvent, detail?: unknown) => window.dispatchEvent(new CustomEvent(name, { detail }));

export const on = <T = unknown>(name: BusEvent, handler: (detail: T) => void) => {
  const h = (e: Event) => handler((e as CustomEvent<T>).detail);
  window.addEventListener(name, h);
  return () => window.removeEventListener(name, h);
};

export const scrollToId = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
