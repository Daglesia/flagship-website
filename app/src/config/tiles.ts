export interface TileConfig {
  title: string;
  description: string;
  imageSrc: string;
  href: string;
  /** Authentik group/role required to see this tile. Omit for public tiles. */
  service?: string;
}

const appUrl = (app: string, query?: string): string => `https://${app}.daglesia.com${query ? query : ""}`

export const TILES: TileConfig[] = [
  {
    title: "Notflix",
    description: "...",
    imageSrc: "/tiles/notflix.png",
    href: appUrl("notflix"),
    service: "notflix",
  },
  {
    title: "Git",
    description: "...",
    imageSrc: "/tiles/shortbox.png",
    href: appUrl("git", "/Magdalena?tab=repositories")
  },
  {
    title: "Penpot",
    description: "...",
    imageSrc: "/tiles/shortbox.png",
    href: appUrl("design" )
  },
];