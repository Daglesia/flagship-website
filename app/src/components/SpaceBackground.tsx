"use client";

import { useLoading } from "@/components/LoadingProvider";

export default function SpaceBackground() {
  const { ready } = useLoading();

  return (
    <div
      className={`absolute left-0 top-0 -z-20 h-screen w-screen overflow-hidden transition-opacity duration-500 ease-out ${
        ready ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="space-grain h-screen w-screen" />
    </div>
  );
}
