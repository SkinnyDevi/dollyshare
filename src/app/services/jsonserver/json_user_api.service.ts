import { v4 as uuid } from 'uuid';
import axios from 'axios';
import JSON_API_URL from './json_server_endpoint';
import User from '../../models/user';
import UserAPI from '../base-apis/base_user.service';

export default class JsonUserAPI implements UserAPI {
  private readonly ENDPOINT = "/users";

  async getUser(userId: User["id"]): Promise<User> {
    const rawUser = await axios.get(JSON_API_URL + this.ENDPOINT + "/" + userId);
    return {
      username: rawUser.data.username,
      email: rawUser.data.email,
      password: 'null',
      id: userId
    }
  }

  async getUsers(userIdList: User["id"][]): Promise<User[]> {
    const users: User[] = [];
    for (let id of userIdList)
      users.push(await this.getUser(id));

    return users;
  }

  async createUser(newUser: User): Promise<User> {
    const userExists = await this.checkExistingEmail(newUser.email);
    if (userExists) throw new Error("User already exists.");

    const finalUser: User = {
      username: newUser.username,
      password: newUser.password,
      email: newUser.email,
      id: uuid()
    };

    const response = await axios.post(JSON_API_URL + this.ENDPOINT, finalUser);
    if (response.status == 201 || response.status === 200) return finalUser;
    throw new Error(`Failed to create user (${response.status}): ${response.data}`);
  }

  async deleteUser(userId: User["id"]): Promise<void> {
    const response = await axios.delete(JSON_API_URL + this.ENDPOINT + "/" + userId);
  }

  async login(email: string, password: string): Promise<User> {
    let baseUrl = JSON_API_URL + this.ENDPOINT;
    baseUrl += `?email=${email}`
    const response = await axios.get(baseUrl);
    if (response.status !== 200 || response.data.length < 1) throw new Error("No login found for " + email);
    const retrievedUser: User = response.data[0];
    if (password !== retrievedUser.password) throw new Error("Incorrect password");

    return {
      username: retrievedUser.username,
      email: retrievedUser.email,
      password: 'null',
      id: retrievedUser.id
    }
  }

  private async checkExistingEmail(email: string) {
    let baseUrl = JSON_API_URL + this.ENDPOINT;
    baseUrl += `?email=${email}`
    const response = await axios.get(baseUrl);
    if (response.status !== 200) throw new Error("Server error when checking email");
    return response.data.length == 1;
  }
}
