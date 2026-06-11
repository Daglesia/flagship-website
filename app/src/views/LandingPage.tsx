import Logo from "@/assets/daglesium.svg";
import MenuItem from "@/components/MenuItem";
import CloudCluster from "@/components/CloudCluster";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      <div className="pl-24 pt-64 ml-4">
        <div className="flex flex-col gap-2 w-fit">
          <h1 className="text-h1 font-bold">Welcome to my domain.</h1>
          <h2 className="text-h2 font-light pl-2">
            Here’s everything to suit my fancy.
            <br />
            Take a look, maybe{" "}
            <span className="bg-gradient-to-r from-primary via-secondary__variant-dark to-secondary inline-block text-transparent bg-clip-text animate-gradient bg-300%">
              yours
            </span>{" "}
            too.
          </h2>
        </div>
      </div>
    </div>
  );
}
