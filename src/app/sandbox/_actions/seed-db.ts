"use server";

import { mockFiles, mockFolders } from "@/lib/mock-data";
import { db } from "@/server/db";
import { files_table, folders_table } from "@/server/db/schema";
import { sql } from "drizzle-orm";

export async function seedDb() {
  try {
    await db.execute(sql`DELETE FROM ${folders_table}`);

    const foldersInsert = await db
      .insert(folders_table)
      .values(
        mockFolders.map((f, i) => ({
          id: i + 1,
          name: f.name,
          parent: i !== 0 ? 1 : null,
        })),
      )
      .$returningId();

    console.log("folders insertion: ", foldersInsert);

    await db.execute(sql`DELETE FROM ${files_table}`);

    const filesInsert = await db
      .insert(files_table)
      .values(
        mockFiles.map((f, i) => ({
          id: i + 1,
          name: f.name,
          size: 5000,
          url: f.url,
          parent: (i % 3) + 1,
        })),
      )
      .$returningId();

    console.log("files insertion: ", filesInsert);
    return { success: "Seeding successful!" };
  } catch (err: unknown) {
    console.error(err);
    return { error: `Something went wrong: ${JSON.stringify(err)}` };
  }
}
