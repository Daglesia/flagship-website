import { auth } from "@/auth";
import TileGrid from "@/components/TileGrid";

export default async function Home() {
  const session = await auth();
  const roles = session?.user?.roles ?? [];
  console.log(session?.user, "wowowo");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="pt-24 text-center">
        <h1 className="text-h1 font-bold">
          {session ? `Welcome back, ${session.user?.name}` : "Your apps"}
        </h1>
      </div>
      <TileGrid roles={roles} />
    </main>
  );
}