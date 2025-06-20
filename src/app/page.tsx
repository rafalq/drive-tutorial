import { db } from "@/server/db";
import {
  files as filesSchema,
  folders as foldersSchema,
} from "@/server/db/schema";
import DriveContents from "./_components/drive-contents";

export default async function HomePage() {
  const folders = await db.select().from(foldersSchema);
  const files = await db.select().from(filesSchema);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="flex items-center justify-center gap-4 text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          <span className="text-2xl text-gray-300">---------</span>{" "}
          <span>Theo Drive</span>
          <span className="text-2xl text-gray-300">---------</span>
        </h1>
      </div>
    </main>
  );
}
