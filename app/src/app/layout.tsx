import type { Metadata } from "next";
import { Raleway, Poppins } from "next/font/google";
import {NextIntlClientProvider} from 'next-intl';

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
      className="default text-primary bg-background text-sm md:text-base"
    >
      <body className={font.className}>
        <NextIntlClientProvider>
        {children}
        <div className="h-screen w-screen overflow-hidden absolute top-0 left-0 -z-20">
          <div className="space-grain h-screen w-screen" />
        </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
