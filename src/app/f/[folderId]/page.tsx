import DriveContents from "@/app/_components/drive-contents";
import { QUERIES } from "@/server/db/queries";

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

  const [files, folders, parents] = await Promise.all([
    QUERIES.getFiles(parsedFolderId),
    QUERIES.getFolders(parsedFolderId),
    QUERIES.getAllParentsForFolder(parsedFolderId),
  ]);

  return <DriveContents files={files} folders={folders} parents={parents} />;
}
