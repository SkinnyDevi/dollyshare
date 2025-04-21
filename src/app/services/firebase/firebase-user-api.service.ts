import { inject, Injectable } from '@angular/core';
import UserAPI from '../base-apis/base_user.service';
import User, { CredentialUser } from '../../models/user';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseUserApiService implements UserAPI {
  private _auth = inject(Auth);
  private _firestore = inject(Firestore);

  private COLLECTION_NAME = "users";

  async getUser(userId: User['id']): Promise<User> {
    const docRef = doc(this._firestore, `${this.COLLECTION_NAME}/${userId}`);
    const userDoc = await getDoc(docRef);

    if (!userDoc.exists()) throw new Error("User Error (404): no such user information for: " + userId);
    return userDoc.data() as User;
  }

  async getUsers(userIdList: User['id'][]): Promise<User[]> {
    const users: User[] = [];
    for (let id of userIdList) users.push(await this.getUser(id));
    return users;
  }

  async createUser(newUser: CredentialUser): Promise<User> {
    const credentials = await createUserWithEmailAndPassword(this._auth, newUser.email, newUser.password);

    const userCredentials = credentials.user;
    const firebaseUser: User = {
      id: userCredentials.uid,
      username: newUser.username,
      email: newUser.email,
      createdAt: Date.now(),
      modifiedAt: Date.now()
    }

    const docRef = doc(this._firestore, `${this.COLLECTION_NAME}/${firebaseUser.id}`);
    await setDoc(docRef, firebaseUser);
    return firebaseUser;
  }

  deleteUser(userId: User['id']): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async login(email: string, password: string): Promise<User> {
    const credentials = await signInWithEmailAndPassword(this._auth, email, password);
    return this.getUser(credentials.user.uid);
  }
}
