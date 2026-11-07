"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

const FADE_MS = 300; // keep in sync with duration-300 below
const FALLBACK_MS = 5000; // never leave the page invisible if navigation stalls

const TransitionContext = createContext<{ navigate: (href: string) => void }>({
  navigate: () => {},
});

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [leaving, setLeaving] = useState(false);
  const busy = useRef(false);

  // New route rendered -> fade back in.
  useEffect(() => {
    busy.current = false;
    setLeaving(false);
  }, [pathname]);

  const navigate = useCallback(
    (href: string) => {
      if (busy.current || href === pathname) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        router.push(href);
        return;
      }

      busy.current = true;
      setLeaving(true);
      setTimeout(() => router.push(href), FADE_MS);
      setTimeout(() => {
        busy.current = false;
        setLeaving(false);
      }, FALLBACK_MS);
    },
    [pathname, router],
  );

  return (
    <TransitionContext.Provider value={{ navigate }}>
      <div
        className={`transition-opacity duration-300 ease-out ${
          leaving ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </div>
    </TransitionContext.Provider>
  );
}

export function TransitionLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const { navigate } = useContext(TransitionContext);
  const router = useRouter();

  useEffect(() => {
    router.prefetch(href); // makes the navigation fast, especially in prod
  }, [router, href]);

  return (
    <a
      href={href}
      className={className}
      onClickCapture={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)
          return;
        e.preventDefault();
        console.log("TransitionLink click ->", href);
        navigate(href);
      }}
    >
      {children}
    </a>
  );
}