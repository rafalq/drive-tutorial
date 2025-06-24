"use client";

import { Button } from "@/components/ui/button";
import { type files_table, type folders_table } from "@/server/db/schema";
import { ChevronRight, Upload } from "lucide-react";
import Link from "next/link";
import { FileRow, FolderRow } from "./dir-row";

export default function DriveContents(props: {
  files: (typeof files_table.$inferSelect)[];
  folders: (typeof folders_table.$inferSelect)[];
  parents: (typeof folders_table.$inferSelect)[];
}) {
  const renderedFolders = props.folders.map((folder) => (
    <FolderRow key={folder.id} folder={folder} />
  ));

  const renderedFiles = props.files.map((file) => (
    <FileRow key={file.id} file={file} />
  ));

  const handleUpload = () => {
    alert("Upload functionality would be implemented here");
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-gray-100">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Link
              href={"/f/1"}
              className="mr-2 rounded-sm p-1 transition-all duration-100 hover:border hover:border-gray-200"
            >
              My Drive
            </Link>
            {props.parents.map((folder) => (
              <div key={folder.id} className="flex items-center">
                <ChevronRight className="mx-2 text-gray-500" size={16} />

                <Link href={`/f/${folder.id}`}>{folder.name}</Link>
              </div>
            ))}
          </div>
          <Button
            onClick={handleUpload}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            <Upload className="mr-2" size={20} />
            Upload
          </Button>
        </div>
        <div className="rounded-lg bg-gray-800 shadow-xl">
          <div className="border-b border-gray-700 px-6 py-4">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
              <div className="col-span-6">Name</div>
              <div className="col-span-3">Type</div>
              <div className="col-span-3">Size</div>
            </div>
          </div>
          <ul>
            {renderedFolders}
            {renderedFiles}
          </ul>
        </div>
      </div>
    </div>
  );
}
