import SharedText from "../../models/shared_text";
import User from "../../models/user";

export default interface ShareTextAPI {
  readonly SHARED_TEXT_LIFETIME_DAYS: number;

  createUpload(
    title: string,
    body: string,
    owner?: User | null,
    shareWith?: User[],
  ): Promise<SharedText>;
  getUploadsFromUser(user: User): Promise<SharedText[]>;
  getUploadById(uploadId: SharedText['id']): Promise<SharedText>;
  deleteUpload(sharedText: SharedText): Promise<void>;
  deleteUploadById(uploadId: SharedText['id']): Promise<void>;
  shareUploadWith(user: User, upload: SharedText): Promise<SharedText>;
  stopSharingUploadWith(user: User, upload: SharedText): Promise<SharedText>;
}
