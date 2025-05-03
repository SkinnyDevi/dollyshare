export default interface User {
  username: string;
  email: string;
  originalEmail?: string;
  id: string;
  createdAt?: number;
  modifiedAt?: number;
}

export interface CredentialUser extends User {
  password: string;
}
