import SharedFiles from "../../models/shared_files";
import UploadedFile from "../../models/uploaded_file";
import User from "../../models/user";

export default interface ShareFilesAPI {
  readonly SHARED_FILES_LIFETIME_DAYS: number;

  createUpload(
    files: UploadedFile[],
    owner?: User,
    shareWith?: User[],
  ): Promise<SharedFiles>;
  getUpload(uploadId: SharedFiles['id']): Promise<SharedFiles>;
  getUploadsFromUser(user: User): Promise<SharedFiles[]>;
  deleteUpload(sharedFiles: SharedFiles): Promise<void>;
  deleteUpload(uploadId: SharedFiles['id']): Promise<void>;
  shareUploadWith(user: User, upload: SharedFiles): Promise<SharedFiles>;
  stopSharingUploadWith(user: User, upload: SharedFiles): Promise<SharedFiles>;
}
