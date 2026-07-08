import type { Metadata } from "next";
import { Raleway, Poppins } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";

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
          {children}
          <div className="absolute left-0 top-0 -z-20 h-screen w-screen overflow-hidden">
            <div className="space-grain h-screen w-screen" />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
