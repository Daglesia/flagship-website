import Logo from "@/assets/daglesium.svg";
import Image from "next/image";
import MenuItem from "@/components/MenuItem";
import CloudCluster from "@/components/CloudCluster";
import { Raleway } from "next/font/google";
import Link from "next/link";
import TextButton from "@/components/TextButton";

import { useTranslations } from "next-intl";

const font = Raleway({ subsets: ["latin"] });

export default function Home() {
  const translate = useTranslations("HomePage");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="absolute bottom-4 left-4 hidden justify-between p-4 md:bottom-auto md:left-12 md:right-12 md:top-12 md:flex md:flex-row md:items-center md:pl-0">
        <MenuItem
          className="hidden md:flex"
          title={translate("sayMyName")}
          label={translate("createdBy")}
          imageSrc={Logo}
        />
      </div>
      <div className="absolute -z-10 h-full w-full">
        <CloudCluster />
      </div>
      <div className="min-h-screen w-screen">
        <div className="mx-4 md:px-24 md:pt-64">
          <div className="flex w-fit flex-col gap-2">
            <h1
              className={`md:text-base text-h1 font-bold tracking-tighter ${font.className}`}
            >
              {translate("title")}
            </h1>
            <h2 className="px-2 text-h2 font-light">
              {translate("description")}
              <br />
              {translate("description2")}
            </h2>
            <Link href="/home" className="mt-4 w-fit">
              <TextButton text={translate("callToAction")} />
            </Link>
          </div>
        </div>
        <div className="relative flex flex-col gap-24 overflow-hidden px-8 pt-8 md:hidden">
          <Image
            src={Logo}
            alt="Daglesium Logo"
            priority
            className="img-primary left-0 right-0 top-4 mx-auto w-12 max-w-12"
          />
        </div>
      </div>
    </main>
  );
}
