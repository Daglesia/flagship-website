import Logo from "@/assets/daglesium.svg";
import Image from "next/image";
import MenuItem from "@/components/MenuItem";
import CloudCluster from "@/components/CloudCluster";
import { Raleway } from "next/font/google";
import Link from "next/link";
import TextButton from "@/components/TextButton";

import {useTranslations} from 'next-intl';

const font = Raleway({ subsets: ["latin"] });

export default function Home() {
  const translate = useTranslations('HomePage')

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="hidden md:flex absolute left-4 bottom-4 md:bottom-auto md:left-12 md:right-12 md:top-12 p-4 md:pl-0 md:flex-row md:flex-row md:items-center justify-between">
        <MenuItem
          className="hidden md:flex"
          title={translate('sayMyName')}
          label={translate('createdBy')}
          imageSrc={Logo}
        />
      </div>
      <div className="absolute h-full w-full -z-10">
        <CloudCluster />
      </div>
      <div className="w-screen min-h-screen">
        <div className="md:px-24 md:pt-64 mx-4">
          <div className="flex flex-col gap-2 w-fit">
            <h1 className={`text-h1 font-bold tracking-tighter md:text-base ${font.className}`}>
              {translate('title')}
            </h1>
            <h2 className="text-h2 font-light px-2">
              {translate('description')}
              <br />
              {translate('description2')}
            </h2>
            <Link href="/home" className="mt-4 w-fit">
              <TextButton text={translate('callToAction')} />
            </Link>
          </div>
        </div>
        <div className="md:hidden relative pt-8 px-8 overflow-hidden flex flex-col gap-24">
          <Image
            src={Logo}
            alt="Daglesium Logo"
            priority
            className="top-4 mx-auto max-w-12 w-12 left-0 right-0 img-primary"
          />
        </div>
      </div>
    </main>
  );
}
