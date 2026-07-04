import Link from "next/link";
import Card from "@/components/Card";
import { TILES } from "@/config/tiles";

export default function TileGrid({ roles }: { roles: string[] }) {
  const visibleTiles = TILES.filter(
    (tile) => !tile.requiredRole || roles.includes(tile.requiredRole),
  );

  if (visibleTiles.length === 0) {
    return (
      <p className="text-h3 font-light opacity-60 px-12">
        No apps available for your account yet.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-8 px-12 py-12 w-full">
      {visibleTiles.map((tile) => (
        <Link key={tile.href} href={tile.href}>
          <Card
            title={tile.title}
            description={tile.description}
            imageSrc={tile.imageSrc}
          />
        </Link>
      ))}
    </div>
  );
}