import { v4 as uuid } from "uuid";
import SharedFiles from "../../models/shared_files";
import UploadedFile from "../../models/uploaded_file";
import User from "../../models/user";
import ShareFilesAPI from "../base-apis/base_share_files.service";
import axios from "axios";
import JSON_API_URL from "./json_server_endpoint";

export default class JsonShareFilesAPI implements ShareFilesAPI {
  private readonly ENDPOINT = "/file_uploads";
  public readonly SHARED_FILES_LIFETIME_DAYS = 5;

  async createUpload(files: UploadedFile[], owner: User | null = null, shareWith: User[] = []): Promise<SharedFiles> {
    const mappedFileIds = files.map(f => f.id);
    const totalSize = files.map(f => f.size).reduce((f1, f2) => f1 + f2);
    const sharedWithIds: string[] = shareWith.map(u => u.id);
    let expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + this.SHARED_FILES_LIFETIME_DAYS);

    const upload: SharedFiles = {
      id: uuid(),
      owner: owner !== null ? owner.id : null,
      size: totalSize,
      expires: expiryDate.getTime(),
      sharedWith: sharedWithIds,
      files: mappedFileIds
    }

    const response = await axios.post(JSON_API_URL + this.ENDPOINT, upload);
    if (response.status !== 201 && response.status !== 200) throw new Error("Could not create shared file upload: " + response.statusText);
    return upload;
  }

  async getUpload(uploadId: SharedFiles["id"]): Promise<SharedFiles> {
    const response = await axios.get(JSON_API_URL + this.ENDPOINT + "/" + uploadId);
    if (response.status === 404) throw new Error(`There is no upload with id '${uploadId}' (Error: 404)`);
    if (response.status !== 201 && response.status !== 200) throw new Error("Could not retrieve shared file upload: " + response.statusText);
    return response.data;
  }

  getUploadsFromUser(user: User): Promise<SharedFiles[]> {
    throw new Error("Method not implemented.");
  }

  async deleteUpload(sharedFiles: SharedFiles): Promise<void> { }

  async deleteUploadById(uploadId: SharedFiles["id"]): Promise<void> { }

  shareUploadWith(user: User, upload: SharedFiles): Promise<SharedFiles> {
    throw new Error("Method not implemented.");
  }

  stopSharingUploadWith(user: User, upload: SharedFiles): Promise<SharedFiles> {
    throw new Error("Method not implemented.");
  }
}
