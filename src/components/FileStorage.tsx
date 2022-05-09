import React, { useState } from "react";
import { getFiles } from "../api/api";
import { FileList } from "./FileList";
import { ShowFolder } from "./ShowFolder";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Button } from './common/Button';

function getFolder(item: FileData) {
  return item.type === "folder";
}

export function FileStorage() {
  const filesFromApi = getFiles();
  const [files, setFiles] = useState(filesFromApi);
  const [folders, setFolders] = useState(files.filter(getFolder));
  const [toggleAlphabeticallySortAToZ, setToggleAlphabeticallySortAToZ] =
    useState(true);
  const [toggleDateSortNewToOld, setToggleDateSortNewToOld] = useState(true);
  const [toggleSizeSmallToLarge, setToggleSizeSmallToLarge] = useState(true);
  const [searchInput, setSearchInput] = useState('');


  const sortAlpabetically = () => {
    let sortedFiles;

    if (toggleAlphabeticallySortAToZ) {
      sortedFiles = files.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      sortedFiles = files.sort((a, b) => b.name.localeCompare(a.name));
    }
    setFiles([...sortedFiles]);
    setToggleAlphabeticallySortAToZ(!toggleAlphabeticallySortAToZ);
  };

  const sortByDate = () => {
    let sortedFiles;
    if (toggleDateSortNewToOld) {
      sortedFiles = files.sort(
        (a, b) => new Date(b.added).getTime() - new Date(a.added).getTime()
      );
    } else {
      sortedFiles = files.sort(
        (a, b) => new Date(a.added).getTime() - new Date(b.added).getTime()
      );
    }
    setFiles([...sortedFiles]);
    setToggleDateSortNewToOld(!toggleDateSortNewToOld);
  };

  const sortBySize = () => {
    let sortedFiles;
    if (toggleSizeSmallToLarge) {
      sortedFiles = files.sort((a, b) => b.size - a.size);
    } else {
      sortedFiles = files.sort((a, b) => a.size - b.size);
    }
    setFiles([...sortedFiles]);
    setToggleSizeSmallToLarge(!toggleSizeSmallToLarge);
  };

  const searchTerm = (file : FileData) => {
    return file.name.toLowerCase().includes(searchInput.toLowerCase());
  }

  const filteredFiles = files.filter(searchTerm);

  const onSearchChange = (e : any) => {
    setSearchInput(e.target.value);
  }

  return (
    <div className="p-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-500">
          Bright File Storage
        </h1>
        <div>
          <div className="pt-6 block mx-auto">
            <Button
              onClickFunction={sortAlpabetically}
              toggleData={toggleAlphabeticallySortAToZ}
              buttonText="Sort Alphabetically "
              toggleOption1="A-Z"
              toggleOption2="Z-A"
            />
            <Button
              onClickFunction={sortByDate}
              toggleData={toggleDateSortNewToOld}
              buttonText="Sort By Date "
              toggleOption1="↓"
              toggleOption2="↑"
            />
            <Button
              onClickFunction={sortBySize}
              toggleData={toggleSizeSmallToLarge}
              buttonText="Sort By Size "
              toggleOption1="↑"
              toggleOption2="↓"
            />
          </div>
          <div className="pt-6">
            <input
              className="appearance-none block w-full text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              value={searchInput}
              name="search"
              placeholder="Search files by name"
              onChange={onSearchChange}
            ></input>
          </div>
        </div>
        <div className="py-6">
          <Router>
            <Routes>
              <Route path="/" element={<FileList files={filteredFiles} />} />
              {folders.map((folder, index) => {
                return (
                  <Route
                    path={`/folder/${folder.slug}`}
                    key={index}
                    element={<ShowFolder folder={folder} />}
                  />
                );
              })}
            </Routes>
          </Router>
        </div>
      </div>
    </div>
  );
}
