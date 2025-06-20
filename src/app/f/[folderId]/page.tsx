import DriveContents from "@/app/_components/drive-contents";
import { db } from "@/server/db";
import { files as filesSchema } from "@/server/db/schema";
import { folders as foldersSchema } from "@/server/db/schema";
import { eq } from "drizzle-orm";

type GoogleDriveCloneProps = {
  params: Promise<{ folderId: string }>;
};

export default async function GoogleDriveClone(props: GoogleDriveCloneProps) {
  const { folderId } = await props.params;
  const parsedFolderId = Number(folderId);

  if (isNaN(parsedFolderId)) {
    return (
      <div className="m-auto flex h-screen max-w-1/2 items-center justify-center p-10">
        <div className="flex items-center gap-2">
          <p className="text-4xl font-semibold">404</p>
          <span className="text-primary/50 mx-2 text-3xl">|</span>
          <p className="text-4xl font-semibold">Invalid folder ID</p>
        </div>
      </div>
    );
  }

  const files = await db.select().from(filesSchema);
  const folders = await db
    .select()
    .from(foldersSchema)
    .where(eq(foldersSchema.parent, parsedFolderId));

  return <DriveContents files={files} folders={folders} />;
}
