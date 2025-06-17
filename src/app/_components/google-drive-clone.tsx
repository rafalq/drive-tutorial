"use client";

import { Button } from "@/components/ui/button";
import { mockFiles, mockFolders } from "@/lib/mock-data";
import { ChevronRight, Upload } from "lucide-react";
import { useMemo, useState } from "react";
import { FileRow, FolderRow } from "./dir-row";

export default function GoogleDriveClone() {
  const [currentFolder, setCurrentFolder] = useState<string>("root");

  const getCurrentFiles = () => {
    return mockFiles.filter((f) => f.parent === currentFolder);
  };

  const getCurrentFolders = () => {
    return mockFolders.filter((f) => f.parent === currentFolder);
  };

  const handleFolderClick = (folderId: string) => {
    setCurrentFolder(folderId);
  };

  const breadcrumbs = useMemo(() => {
    const breadcrumbs = [];
    let currentId = currentFolder;

    while (currentId !== "root") {
      const folder = mockFolders.find((file) => file.id === currentId);
      if (folder) {
        breadcrumbs.unshift(folder);
        currentId = folder.parent ?? "root";
      } else {
        break;
      }
    }

    return breadcrumbs;
  }, [currentFolder]);

  const handleUpload = () => {
    alert("Upload functionality would be implemented here");
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-gray-100">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Button
              onClick={() => setCurrentFolder("root")}
              variant="ghost"
              className="mr-2"
            >
              My Drive
            </Button>
            {breadcrumbs.map((folder) => (
              <div key={folder.id} className="flex items-center">
                <ChevronRight className="mx-2 text-gray-500" size={16} />
                <Button
                  onClick={() => handleFolderClick(folder.id)}
                  variant="ghost"
                >
                  {folder.name}
                </Button>
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
            {getCurrentFolders().map((f) => (
              <FolderRow
                key={f.id}
                f={f}
                handleFolderClick={() => handleFolderClick(f.id)}
              />
            ))}
            {getCurrentFiles().map((f) => (
              <FileRow key={f.id} f={f} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
