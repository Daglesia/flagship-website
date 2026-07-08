import Authentik from "@/assets/authentik.svg";
import Jellyfin from "@/assets/jellyfin.svg";
import Forgejo from "@/assets/forgejo.svg";
import Wikijs from "@/assets/wikijs.svg";
import Penpot from "@/assets/penpot.svg";
import Music from "@/assets/music.svg";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface TileConfig {
  title: string;
  description: string;
  icon: StaticImport;
  href: string;
  service?: string;
  upcoming?: boolean;
}

const appUrl = (app: string, query?: string): string =>
  `https://${app}.daglesia.com${query ? query : ""}`;

export const createTiles = (
  translate: (key: string) => string,
): TileConfig[] => [
  {
    title: translate("jellyfin.title"),
    description: translate("jellyfin.description"),
    icon: Jellyfin,
    href: appUrl("notflix"),
    service: "notflix",
  },
  {
    title: translate("git.title"),
    description: translate("git.description"),
    icon: Forgejo,
    href: appUrl("git", "/Magdalena?tab=repositories"),
  },
  {
    title: translate("penpot.title"),
    description: translate("penpot.description"),
    icon: Penpot,
    href: appUrl("design"),
  },
  {
    title: translate("authentik.title"),
    description: translate("authentik.description"),
    icon: Authentik,
    href: appUrl("auth"),
    service: "authentik",
  },
  {
    title: translate("wikijs.title"),
    description: translate("wikijs.description"),
    icon: Wikijs,
    href: appUrl("docs"),
  },
  {
    title: translate("music.title"),
    description: translate("music.description"),
    icon: Music,
    href: appUrl("docs"),
    upcoming: true,
  },
  {
    title: translate("models.title"),
    description: translate("models.description"),
    icon: Music,
    href: appUrl("docs"),
    upcoming: true,
  },
];
