import React from "react";

export function File({ file } : { file : FileData }) {
  return (
    <div className="flex justify-between border-b-2 py-3 mt-2">
      <div className="w-20">📄</div>
      <div data-testid="file-name" className="w-56">
        {file.name}
      </div>
      <div className="w-20">{file.type}</div>
      <div className="w-20">{file.size} MB</div>
      <div className="w-32">{file.added}</div>
    </div>
  );
}
