import { getModulesWithResources } from "@/lib/dal";
import ResourceHub from "./ResourceHub";

export default async function ResourceHubPage() {
  const modules = await getModulesWithResources();

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="animate-fade-up">
        <h1 className="text-3xl font-semibold tracking-tightest text-[#1d1d1f] sm:text-4xl">
          Resource Hub
        </h1>
        <p className="mt-1.5 text-[15px] text-[#1d1d1f]/55">
          Every module's lecture video, revision notes, and past papers in one place.
        </p>
      </div>

      <ResourceHub modules={modules} />
    </div>
  );
}
