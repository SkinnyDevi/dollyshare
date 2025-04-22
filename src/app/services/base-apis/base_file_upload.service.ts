import UploadedFile from "../../models/uploaded_file";
import { v4 as uuid } from 'uuid';

export default interface FileUploadAPI {
  uploadFiles(files: File[]): Promise<UploadedFile[]>;
  getFileFrom(id: UploadedFile["id"]): Promise<UploadedFile>;
  getFilesFrom(ids: UploadedFile["id"][]): Promise<UploadedFile[]>;
  deleteFile(file: UploadedFile): Promise<void>;
  deleteFiles(files: UploadedFile[]): Promise<void>;
  deleteFileById(fileId: UploadedFile["id"]): Promise<void>;
}

export function getFileType(file: UploadedFile) {
  const dataIndex = file.content.indexOf('data:');
  const endIndex = file.content.indexOf(';');
  return file.content.substring(dataIndex + 5, endIndex);
}

export async function convertFileToBase64(file: File): Promise<UploadedFile> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result as string;
      resolve({
        id: uuid(),
        name: file.name,
        type: file.type,
        size: file.size,
        content: base64String,
        createdAt: Date.now()
      });
    };

    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

export async function processFiles(files: File[]): Promise<UploadedFile[]> {
  try {
    const uploadedFiles = await Promise.all(
      files.map(file => convertFileToBase64(file))
    );
    return uploadedFiles;
  } catch (error) {
    console.error('Error converting files:', error);
    throw error;
  }
}
