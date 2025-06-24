import DriveContents from "@/app/_components/drive-contents";
import { db } from "@/server/db";
import { files as filesSchema } from "@/server/db/schema";
import { folders as foldersSchema } from "@/server/db/schema";
import { eq } from "drizzle-orm";

async function getAllParents(folderId: number) {
  const parents = [];
  let currentId: number | null = folderId;

  while (currentId !== null) {
    const folder = await db
      .selectDistinct()
      .from(foldersSchema)
      .where(eq(foldersSchema.id, currentId));

    if (!folder[0]) throw new Error("Folder not found");
    parents.unshift(folder[0]);
    currentId = folder[0]?.parent;
  }

  return parents;
}

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

  const filesPromise = db.select().from(filesSchema);
  const foldersPromise = db
    .select()
    .from(foldersSchema)
    .where(eq(foldersSchema.parent, parsedFolderId));
  const parentsPromise = getAllParents(parsedFolderId);

  const [files, folders, parents] = await Promise.all([
    filesPromise,
    foldersPromise,
    parentsPromise,
  ]);

  return <DriveContents files={files} folders={folders} parents={parents} />;
}
