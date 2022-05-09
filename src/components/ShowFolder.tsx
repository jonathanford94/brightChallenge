import React from "react";
import { File } from './File';
import { Link } from 'react-router-dom';

export function ShowFolder({ folder } : { folder : FileData}) {
  return (
    <>
      <Link to="/" className="text-blue-500 hover:text-blue-700">← Return to Files List</Link>
      {folder?.files?.map((file, index) => {
        return <File file={file} key={index} />;
      })}
    </>
  );
}
