interface FileData {
  date: string | number | Date;
  id: number;
  type: string;
  name: string;
  added: string;
  size: number;
  slug?: string;
  files?: FileItem[];
}

interface FileItem {
  date: string | number | Date;
  id: number;
  type: string;
  name: string;
  added: string;
  size: number;
  slug?: string;
}
