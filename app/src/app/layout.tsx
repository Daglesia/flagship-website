import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { LoadingProvider } from "@/components/LoadingProvider";
import SpaceBackground from "@/components/SpaceBackground";

import { PageTransitionProvider } from "@/components/PageTransition";

const font = Poppins({ subsets: ["latin"], weight: ["200", "500"] });

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Daglesium",
  description: "Automate. Monitor. Relax.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="text-sm md:text-base bg-background text-primary default"
    >
      <body className={font.className}>
        <NextIntlClientProvider>
          <LoadingProvider>
            <PageTransitionProvider>{children}</PageTransitionProvider>
            <SpaceBackground />
          </LoadingProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
