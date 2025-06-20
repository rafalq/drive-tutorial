"use client";

import { Button } from "@/components/ui/button";

import { Database, Loader } from "lucide-react";
import { startTransition, useActionState, useEffect } from "react";
import { seedDb } from "./_actions/seed-db";
import { toast } from "sonner";

export default function SandboxPage() {
  const [resultStatus, action, pending] = useActionState(seedDb, null);

  useEffect(() => {
    if (resultStatus?.success) {
      toast.success(resultStatus.success);
    } else if (resultStatus?.error) {
      toast.error(resultStatus.error);
    }
  }, [resultStatus]);

  return (
    <div className="mx-auto flex max-w-2/3 flex-col items-center justify-center gap-6 py-10">
      <h1 className="text-2xl font-semibold">Seed Function</h1>

      <Button onClick={() => startTransition(action)} className="w-32">
        {pending ? (
          <>
            Seeding... <Loader className="animate-spin" />
          </>
        ) : (
          <>
            Seed <Database />
          </>
        )}
      </Button>
    </div>
  );
}
