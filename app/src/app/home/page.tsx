import { auth, signIn, signOut } from "@/auth";
import TileGrid from "@/components/TileGrid";
import TextButton from "@/components/TextButton";

export default async function Home() {
  const session = await auth();
  const availableServices = session?.user?.available_services ?? [];
  console.log(session, "shmoles");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="pt-24 text-center">
        <h1 className="text-h1 font-bold">
          {session ? `Welcome back, ${session.user?.name}` : "Your apps"}
        </h1>
      </div>

      <TileGrid availableServices={availableServices} />

      <div className="pb-12">
        {session ? (
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <TextButton text="Log out" />
          </form>
        ) : (
          <form
            action={async () => {
              "use server";
              await signIn("authentik");
            }}
          >
            <TextButton text="Log in" />
          </form>
        )}
      </div>
    </main>
  );
}