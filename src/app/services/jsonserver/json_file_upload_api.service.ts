import axios from "axios";
import UploadedFile from "../../models/uploaded_file";
import FileUploadAPI from "../base-apis/base_file_upload.service";
import JSON_API_URL from "./json_server_endpoint";
import { v4 as uuid } from "uuid";

export default class JsonFileUploadAPI implements FileUploadAPI {
  private readonly ENDPOINT = "/file_storage"

  async uploadFiles(files: File[]): Promise<UploadedFile[]> {
    const processedFiles = await this.processFiles(files);

    const uploadedFiles: UploadedFile[] = [];
    for (let file of processedFiles) {
      file.type = file.type !== "" ? file.type : this.getFileType(file);
      const response = await axios.post(JSON_API_URL + this.ENDPOINT, file);
      if (response.status != 201 && response.status != 200) throw new Error("Could not upload file" + file.name);
      uploadedFiles.push(response.data);
    }

    return uploadedFiles;
  }

  async getFileFrom(id: UploadedFile["id"]): Promise<UploadedFile> {
    const response = await axios.get(JSON_API_URL + this.ENDPOINT + "/" + id);
    if (response.status === 404) throw new Error(`There is no file with id '${id}' (Error: 404)`);
    if (response.status !== 201 && response.status !== 200) throw new Error("Could not retrieve file upload: " + response.statusText);
    return response.data;
  }

  async getFilesFrom(ids: UploadedFile["id"][]): Promise<UploadedFile[]> {
    const files: UploadedFile[] = [];
    for (let id of ids)
      files.push(await this.getFileFrom(id));

    return files;
  }

  deleteFile(file: UploadedFile): Promise<void> {
    throw new Error("Method not implemented.");
  }

  deleteFiles(files: UploadedFile[]): Promise<void> {
    throw new Error("Method not implemented.");
  }

  private getFileType(file: UploadedFile) {
    const dataIndex = file.content.indexOf('data:');
    const endIndex = file.content.indexOf(';');
    return file.content.substring(dataIndex + 5, endIndex);
  }

  private async convertFileToBase64(file: File): Promise<UploadedFile> {
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

  private async processFiles(files: File[]): Promise<UploadedFile[]> {
    try {
      const uploadedFiles = await Promise.all(
        files.map(file => this.convertFileToBase64(file))
      );
      return uploadedFiles;
    } catch (error) {
      console.error('Error converting files:', error);
      throw error;
    }
  }
}
