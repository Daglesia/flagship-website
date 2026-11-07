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

// Safety net: never leave the page invisible if loading hangs or WebGL fails.
const MAX_WAIT_MS = 10000;

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const markReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    const timeout = setTimeout(markReady, MAX_WAIT_MS);
    return () => clearTimeout(timeout);
  }, [markReady]);

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