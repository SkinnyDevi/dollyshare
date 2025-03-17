import SharedFiles from "../../models/shared_files";
import User from "../../models/user";

export default interface ShareFilesAPI {
  createUpload(
    files: any[],
    owner?: User,
    shareWith?: User[],
  ): Promise<SharedFiles>;
  getUploadsFromUser(user: User): Promise<SharedFiles[]>;
  deleteUpload(sharedFiles: SharedFiles): Promise<void>;
  deleteUpload(uploadId: SharedFiles['id']): Promise<void>;
  shareUploadWith(user: User, upload: SharedFiles): Promise<SharedFiles>;
  stopSharingUploadWith(user: User, upload: SharedFiles): Promise<SharedFiles>;
}
