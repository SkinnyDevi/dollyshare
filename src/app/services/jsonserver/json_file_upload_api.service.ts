import axios from "axios";
import UploadedFile from "../../models/uploaded_file";
import FileUploadAPI, { getFileType, processFiles } from "../base-apis/base_file_upload.service";
import JSON_API_URL from "./json_server_endpoint";

export default class JsonFileUploadAPI implements FileUploadAPI {
  private readonly ENDPOINT = "/file_storage"

  async uploadFiles(files: File[]): Promise<UploadedFile[]> {
    const processedFiles = await processFiles(files);

    const uploadedFiles: UploadedFile[] = [];
    for (let file of processedFiles) {
      file.type = file.type !== "" ? file.type : getFileType(file);
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

  async deleteFiles(files: UploadedFile[]): Promise<void> {
    for (let file of files) await this.deleteFile(file);
  }

  async deleteFile(file: UploadedFile): Promise<void> {
    await this.deleteFileById(file.id);
  }

  async deleteFileById(fileId: UploadedFile["id"]): Promise<void> {
    const response = await axios.delete(JSON_API_URL + this.ENDPOINT + "/" + fileId);
    if (response.status === 404) throw new Error(`There is no file with id '${fileId}' (Error: 404)`);
    if (response.status !== 201 && response.status !== 200) throw new Error("Could not delete file upload: " + response.statusText);
  }
}
