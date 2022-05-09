import React from "react";
import { File } from "./File";
import { Folder } from "./Folder";

export function FileList({ files }: { files: FileData[] }) {
  return (
    <div>
      {files.map((file, index) => {
        return (
          <div key={index}>
            {file.type === "folder" ? (
              <Folder folder={file} />
            ) : (
              <File file={file} />
            )}
          </div>
        );
      })}
    </div>
  );
}
