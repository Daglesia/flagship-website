import { auth, signIn, signOut } from "@/auth";
import TileGrid from "@/components/TileGrid";
import TextButton from "@/components/TextButton";
import { createTiles } from "@/config/tiles";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const session = await auth();
  const availableServices = session?.user?.available_services ?? [];
  const translate = await getTranslations("SolutionSelector");
  const tiles = createTiles((key) => translate(`tiles.${key}`));

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="pt-24 text-center">
        <h1 className="text-h1 font-bold">
          {translate("title")}
        </h1>
      </div>

      <TileGrid availableServices={availableServices} tiles={tiles} />

      <div className="pb-12">
        {session ? (
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <TextButton text={translate("logout")} />
          </form>
        ) : (
          <form
            action={async () => {
              "use server";
              await signIn("authentik");
            }}
          >
            <TextButton text={translate("login")} />
          </form>
        )}
      </div>
    </main>
  );
}