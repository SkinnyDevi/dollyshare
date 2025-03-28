import axios from "axios";
import SharedText from "../../models/shared_text";
import User from "../../models/user";
import ShareTextAPI from "../base-apis/base_share_text.service";
import { v4 as uuid } from 'uuid';
import JSON_API_URL from "./json_server_endpoint";

export default class JsonShareTextAPI implements ShareTextAPI {
  private readonly ENDPOINT = "/text_uploads";
  public readonly SHARED_TEXT_LIFETIME_DAYS = 5;

  async createUpload(title: string, body: string, owner: User | null = null, shareWith: User[] = []): Promise<SharedText> {
    let expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + this.SHARED_TEXT_LIFETIME_DAYS);

    const upload: SharedText = {
      id: uuid(),
      title: btoa(title),
      body: btoa(body),
      owner: owner !== null ? owner.id : null,
      sharedWith: shareWith.map(u => u.id),
      expires: expiryDate.getTime()
    };

    const response = await axios.post(JSON_API_URL + this.ENDPOINT, upload);
    if (response.status !== 201 && response.status !== 200) throw new Error("Could not create text upload: " + response.statusText);

    return upload;
  }

  async getUploadById(uploadId: SharedText["id"]): Promise<SharedText> {
    let baseRequestUrl = JSON_API_URL + this.ENDPOINT + "/" + uploadId;
    const response = await axios.get(baseRequestUrl);
    if (response.status === 404) throw new Error("Text upload not found.");
    if (response.status !== 201 && response.status !== 200) throw new Error("Could not request text upload: " + response.statusText);

    let parsedResponse = response.data as SharedText;
    parsedResponse.title = atob(parsedResponse.title);
    parsedResponse.body = atob(parsedResponse.body);
    return parsedResponse;
  }

  async getUploadsFromUser(user: User): Promise<SharedText[]> {
    let baseUrl = JSON_API_URL + this.ENDPOINT;
    // This should be queried with owner parameter,
    // but json-server has a bug where if the field is null,
    // the field still appears when querying with value.
    //
    // baseUrl += "?owner=" + user.id;

    const response = await axios.get(baseUrl);
    if (response.status !== 201 && response.status !== 200) throw new Error("Could not retrieve shared files for user: " + response.statusText);

    // Temporary fix for the bug above
    const allUploads = response.data as SharedText[];
    return allUploads.filter(fu => fu.owner === user.id);
  }

  deleteUpload(sharedText: SharedText): Promise<void> {
    throw new Error("Method not implemented.");
  }

  deleteUploadById(uploadId: SharedText["id"]): Promise<void> {
    throw new Error("Method not implemented.");
  }

  shareUploadWith(user: User, upload: SharedText): Promise<SharedText> {
    throw new Error("Method not implemented.");
  }

  stopSharingUploadWith(user: User, upload: SharedText): Promise<SharedText> {
    throw new Error("Method not implemented.");
  }
}
