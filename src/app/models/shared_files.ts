import User from "./user";

export default interface SharedFiles {
  id: string;
  owner?: User['id'];
  size: number;
  expires: number;
  sharedWith: User['id'][];
  files: "File"[];
}
