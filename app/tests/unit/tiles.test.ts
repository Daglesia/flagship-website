import { describe, expect, it, vi } from "vitest";

vi.mock("@/assets/authentik.svg", () => ({ default: "/authentik.svg" }));
vi.mock("@/assets/jellyfin.svg", () => ({ default: "/jellyfin.svg" }));
vi.mock("@/assets/forgejo.svg", () => ({ default: "/forgejo.svg" }));
vi.mock("@/assets/wikijs.svg", () => ({ default: "/wikijs.svg" }));
vi.mock("@/assets/penpot.svg", () => ({ default: "/penpot.svg" }));
vi.mock("@/assets/music.svg", () => ({ default: "/music.svg" }));

import { createTiles } from "@/config/tiles";

describe("createTiles", () => {
  it("creates translated tile data from a translation callback", () => {
    const tiles = createTiles((key) => {
      const values: Record<string, string> = {
        "jellyfin.title": "Jellyfin",
        "jellyfin.description": "Media server",
        "git.title": "Git",
        "git.description": "Forgejo",
      };

      return values[key] ?? key;
    });

    expect(tiles[0]).toMatchObject({
      title: "Jellyfin",
      description: "Media server",
      href: "https://notflix.daglesia.com",
    });
    expect(tiles[1]).toMatchObject({
      title: "Git",
      description: "Forgejo",
      href: "https://git.daglesia.com/Magdalena?tab=repositories",
    });
  });
});
