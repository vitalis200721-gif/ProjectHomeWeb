import { FinderWizard } from "@/components/FinderWizard";
import Image from "next/image";

export default function FinderPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center">
        <h1 className="text-3xl font-semibold mb-4">AI Property Finder</h1>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
          Answer a few questions and let our AI suggest the best projects tailored to your preferences.
        </p>
      </div>
      <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-lg shadow">
        <FinderWizard />
      </div>
      <div className="flex justify-center">
        <Image
          src="/media/img-070.jpg"
          alt="Finder illustration"
          width={800}
          height={400}
          className="rounded-lg hidden sm:block"
        />
      </div>
    </div>
  );
}
