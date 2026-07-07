import Link from "next/link";
import Card from "@/components/Card";
import { TileConfig, TILES } from "@/config/tiles";
export default function TileGrid({ availableServices }: { availableServices: string[] }) {
  const noUserAccessToTile = (tile: TileConfig) => tile.service && !availableServices.includes(tile.service);
  const footnote = (tile: TileConfig) => {
    if (tile.upcoming) return "Coming soon!";
    if (noUserAccessToTile(tile)) return "No access."
    return "";
  }
  const sortPriority = (tile: TileConfig) => {
    if (tile.upcoming) return 1;
    if (noUserAccessToTile(tile)) return 2;
    return 0;
  };
  const visibleTiles = TILES.map(
    (tile) => 
    ({
      disabled: noUserAccessToTile(tile) || tile.upcoming,
      footnote: footnote(tile),
      ...tile,
    })
  ).sort((a, b) => {
    const priorityDiff = sortPriority(a) - sortPriority(b);
    if (priorityDiff !== 0) return priorityDiff;
    return a.title.localeCompare(b.title);
  });
  if (visibleTiles.length === 0) {
    return (
      <p className="text-h3 font-light opacity-60 px-12">
        No apps available for your account yet.
      </p>
    );
  }
  return (
    <div className="flex flex-wrap gap-8 px-12 py-12 w-full">
      {visibleTiles.map((tile) => {
        const card = (
          <Card
            title={tile.title}
            description={tile.description}
            icon={tile.icon}
            disabled={tile.disabled}
            footnote={tile.footnote}
          />
        );
        return tile.disabled ? (
          <div key={tile.href} className="flex">
            {card}
          </div>
        ) : (
          <Link key={tile.href} href={tile.href} className="flex">
            {card}
          </Link>
        );
      })}
    </div>
  );
}