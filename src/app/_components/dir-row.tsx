import { FileIcon, Folder as FolderIcon } from "lucide-react";

import type { File, Folder } from "@/lib/mock-data";

export function FileRow({ f }: { f: File }) {
  return (
    <li
      key={f.id}
      className="hover:bg-gray-750 border-b border-gray-700 px-6 py-4"
    >
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-6 flex items-center">
          <a
            href={f.url}
            className="flex items-center text-gray-100 hover:text-blue-400"
            target="_blank"
          >
            <FileIcon className="mr-3" size={20} />
            {f.name}
          </a>
        </div>
        <div className="col-span-3 text-gray-400">{"File"}</div>
        <div className="col-span-3 text-gray-400">{f.size}</div>
      </div>
    </li>
  );
}

export function FolderRow({
  f,
  handleFolderClick,
}: {
  f: Folder;
  handleFolderClick: (id: string) => void;
}) {
  return (
    <li
      key={f.id}
      className="hover:bg-gray-750 border-b border-gray-700 px-6 py-4"
    >
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-6 flex items-center">
          <button
            onClick={() => handleFolderClick(f.id)}
            className="flex items-center text-gray-100 hover:cursor-pointer hover:text-blue-400"
          >
            <FolderIcon className="mr-3" size={20} />
            {f.name}
          </button>
        </div>
        <div className="col-span-3 text-gray-400">{"Folder"}</div>
        <div className="col-span-3 text-gray-400">{"--"}</div>
      </div>
    </li>
  );
}
