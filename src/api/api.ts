const filesDataMock: FileData[] = require("../data/files.json").data;

export function getFiles() {
    const data = filesDataMock;
    return data;
}