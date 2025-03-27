import UploadedFile from "../../models/uploaded_file";

export default interface FileUploadAPI {
  uploadFiles(files: File[]): Promise<UploadedFile[]>;
  getFileFrom(id: UploadedFile["id"]): Promise<UploadedFile>;
  getFilesFrom(ids: UploadedFile["id"][]): Promise<UploadedFile[]>;
  deleteFile(file: UploadedFile): Promise<void>;
  deleteFiles(files: UploadedFile[]): Promise<void>;
}
