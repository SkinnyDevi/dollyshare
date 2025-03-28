import User from "./user";

export default interface SharedText {
  id: string;
  owner: User['id'] | null;
  expires: number;
  sharedWith: User['id'][];
  title: string;
  body: string;
}
