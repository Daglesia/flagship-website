import Authentik from "@/assets/Authentik.svg";
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

const appUrl = (app: string, query?: string): string => `https://${app}.daglesia.com${query ? query : ""}`

export const TILES: TileConfig[] = [
  {
    title: "Jellyfin",
    description: "Personal media server with a touch of my sense of humour.",
    icon: Jellyfin,
    href: appUrl("notflix"),
    service: "notflix",
  },
  {
    title: "Git",
    description: "Self-hosted Forgejo instance for code and issue tracking.",
    icon: Forgejo,
    href: appUrl("git", "/Magdalena?tab=repositories")
  },
  {
    title: "Penpot",
    description: "A workspace for designs and UX.",
    icon: Penpot,
    href: appUrl("design" )
  },
  {
    title: "Authentik",
    description: "Authentication and authorization service.",
    icon: Authentik,
    href: appUrl("auth" ),
    service: "authentik",
  },
  {
    title: "Wiki.js",
    description: "Documentation. But mostly D&D 5th edition utilities.",
    icon: Wikijs,
    href: appUrl("docs" )
  },
  {
    title: "My music",
    description: "My other passion, not as skilled in this one though.",
    icon: Music,
    href: appUrl("docs" ),
    upcoming: true,
  },
  {
    title: "My 3D models",
    description: "Making my life easier and fancier by using a 3D printer.",
    icon: Music,
    href: appUrl("docs" ),
    upcoming: true,
  },
];