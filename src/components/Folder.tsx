import React from "react";
import {
  Link,
} from "react-router-dom";

export function Folder({folder} : { folder : FileData}) {
  return (
    <Link to={`/folder/${folder.slug}`}>
      <div className="flex justify-between border-b-2 py-3 mt-2 hover:text-blue-500">
        <div className="w-20">🗂</div>
        <div data-testid="file-name" className="w-56">
          {folder.name}
        </div>
        <div className="w-20">{folder.type}</div>
        <div className="w-20">{folder.size} MB</div>
        <div className="w-32">{folder.added}</div>
      </div>
    </Link>
  );
}
