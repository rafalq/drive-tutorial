import { db } from "@/server/db";
import {
  files_table as filesSchema,
  folders_table as foldersSchema,
} from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export async function getAllParentsForFolder(folderId: number) {
  const parents = [];
  let currentId: number | null = folderId;

  while (currentId !== null) {
    const folder = await db
      .selectDistinct()
      .from(foldersSchema)
      .where(eq(foldersSchema.id, currentId));

    if (!folder[0]) {
      return notFound();
    }

    parents.unshift(folder[0]);
    currentId = folder[0]?.parent;
  }

  return parents;
}

export function getFiles(folderId: number) {
  return db.select().from(filesSchema).where(eq(filesSchema.parent, folderId));
}

export function getFolders(folderId: number) {
  return db
    .select()
    .from(foldersSchema)
    .where(eq(foldersSchema.parent, folderId));
}
