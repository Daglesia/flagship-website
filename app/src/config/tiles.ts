export interface TileConfig {
  title: string;
  description: string;
  imageSrc: string;
  href: string;
  /** Authentik group/role required to see this tile. Omit for public tiles. */
  requiredRole?: string;
}

export const TILES: TileConfig[] = [
  {
    title: "Notflix",
    description: "Watch what you want, when you want.",
    imageSrc: "/tiles/notflix.png",
    href: "/apps/notflix",
    requiredRole: "notflix:user",
  },
  {
    title: "Git",
    description: "Files, synced everywhere.",
    imageSrc: "/tiles/shortbox.png",
    href: "https://git.daglesia.com/Magdalena?tab=repositories",
  },
];