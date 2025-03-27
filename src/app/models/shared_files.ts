import UploadedFile from "./uploaded_file";
import User from "./user";

export default interface SharedFiles {
  id: string;
  owner: User['id'] | null;
  size: number;
  expires: number;
  sharedWith: User['id'][];
  files: UploadedFile["id"][];
}
