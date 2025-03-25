import User from "../../models/user";

export default interface UserAPI {
  getUser(userId: User["id"]): Promise<User>;
  getUsers(userIdList: User["id"][]): Promise<User[]>;
  createUser(newUser: User): Promise<User>;
  deleteUser(userId: User["id"]): Promise<void>;
  login(email: string, password: string): Promise<User>;
}
