import SharedText from "../../models/shared_text";
import User from "../../models/user";

export default interface ShareTextAPI {
  createUpload(
    title: string,
    body: string,
    owner?: User,
    shareWith?: User[],
  ): Promise<SharedText>;
  getUploadsFromUser(user: User): Promise<SharedText[]>;
  deleteUpload(sharedFiles: SharedText): Promise<void>;
  deleteUpload(uploadId: SharedText['id']): Promise<void>;
  shareUploadWith(user: User, upload: SharedText): Promise<SharedText>;
  stopSharingUploadWith(user: User, upload: SharedText): Promise<SharedText>;
}
