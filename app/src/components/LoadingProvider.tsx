"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface LoadingContextValue {
  ready: boolean;
  markReady: () => void;
}

const LoadingContext = createContext<LoadingContextValue>({
  ready: false,
  markReady: () => {},
});

const BACKGROUND_SRC = "/sky.webp";

const MAX_WAIT_MS = 10000;

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [contentReady, setContentReady] = useState(false);
  const [backgroundReady, setBackgroundReady] = useState(false);
  const markReady = useCallback(() => setContentReady(true), []);

  useEffect(() => {
    let cancelled = false;
    const done = () => {
      if (!cancelled) setBackgroundReady(true);
    };
    const img = new window.Image();
    img.src = BACKGROUND_SRC;
    img.decode().then(done, done); // on error, don't block the page

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setContentReady(true);
      setBackgroundReady(true);
    }, MAX_WAIT_MS);
    return () => clearTimeout(timeout);
  }, []);

  const ready = contentReady && backgroundReady;
  const value = useMemo(() => ({ ready, markReady }), [ready, markReady]);

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
}

export const useLoading = () => useContext(LoadingContext);

export function ReadyOnMount() {
  const { markReady } = useLoading();
  useEffect(() => {
    markReady();
  }, [markReady]);
  return null;
}
