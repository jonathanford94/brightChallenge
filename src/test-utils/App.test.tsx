import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";

const filesDataMock: FileData[] = require("../data/files.json").data;

function getFile(item: FileData) {
  return item.type !== "folder";
}

function getFolder(item: FileData) {
  return item.type === "folder";
}

describe("Filestorage <App />", () => {
  it("renders file storage index", () => {
    render(<App />);
    const linkElement = screen.getByText(/File Storage/i);
    expect(linkElement).toBeInTheDocument();
  });

  it("diplays a list of files", () => {
    render(<App />);
    const filesInMock = filesDataMock.filter(getFile);

    const exampleFile1Name = filesInMock[0].name;

    const exampleFile1Element = screen.getByText(exampleFile1Name);

    expect(exampleFile1Element).toBeVisible();

    const exampleFile2Name = filesInMock[1].name;

    const exampleFile2Element = screen.getByText(exampleFile2Name);

    expect(exampleFile2Element).toBeVisible();
  });

  it("can sort the files by name", () => {
    render(<App />);
    const firstFileInMockList = filesDataMock[0];
    const allFilesInList = screen.getAllByTestId("file-name");

    expect(allFilesInList[0].innerHTML).toEqual(firstFileInMockList.name);

    const sortAlphabeticallyButton = screen.getByText(
      "Sort Alphabetically A-Z"
    );

    fireEvent.click(sortAlphabeticallyButton);

    const filesMockSortedAlphabetically = filesDataMock.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    const allAlphabeticalFilesInList = screen.getAllByTestId("file-name");

    expect(allAlphabeticalFilesInList[0].innerHTML).toEqual(
      filesMockSortedAlphabetically[0].name
    );
  });

  it("can sort the files by date added", () => {
    render(<App />);
    const firstFileInMockList = filesDataMock[0];
    const allFilesInList = screen.getAllByTestId("file-name");

    expect(allFilesInList[0].innerHTML).toEqual(firstFileInMockList.name);

    const sortByDateButton = screen.getByText("Sort By Date ↓");

    fireEvent.click(sortByDateButton);

    const filesMockSortedByDate = filesDataMock.sort(
      (a, b) => new Date(b.added).getTime() - new Date(a.added).getTime()
    );

    const allFilesByDateInList = screen.getAllByTestId("file-name");

    expect(allFilesByDateInList[0].innerHTML).toEqual(
      filesMockSortedByDate[0].name
    );
  });

  it("can sort the files by size", () => {
    render(<App />);
    const firstFileInMockList = filesDataMock[0];
    const allFilesInList = screen.getAllByTestId("file-name");

    expect(allFilesInList[0].innerHTML).toEqual(firstFileInMockList.name);

    const sortBySizeButton = screen.getByText("Sort By Size ↑");

    fireEvent.click(sortBySizeButton);

    const filesMockSortedBySize = filesDataMock.sort((a, b) => b.size - a.size);

    const allFilesBySizeInList = screen.getAllByTestId("file-name");

    expect(allFilesBySizeInList[0].innerHTML).toEqual(
      filesMockSortedBySize[0].name
    );
  });

  it("can filter the files by name", async () => {
    render(<App />);
    const allFilesInList = screen.getAllByTestId("file-name");

    expect(allFilesInList.length).toEqual(filesDataMock.length);

    const filterFilesInput = await screen.findByPlaceholderText(
      "Search files by name"
    );

    fireEvent.change(filterFilesInput, {
      target: { value: filesDataMock[0].name },
    });

    const filteredFilesInList = screen.getAllByTestId("file-name");

    expect(filteredFilesInList.length).toEqual(1);
    expect(filteredFilesInList[0].innerHTML).toEqual(filesDataMock[0].name);
  });

  it("can display the files in a folder after being clicked", () => {
    render(<App />);
    const firstFolderInMock = filesDataMock.filter(getFolder);

    const exampleFolder = screen.getByText(firstFolderInMock[0].name);

    fireEvent.click(exampleFolder);

    const firstFileInFolder = firstFolderInMock[0]?.files?.find(getFile)?.name;

    let exampleFileElement;

    if (firstFileInFolder) {
      exampleFileElement = screen.getByText(firstFileInFolder);
    }

    expect(exampleFileElement).toBeVisible();
  });
});
