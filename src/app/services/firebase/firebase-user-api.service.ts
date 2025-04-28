import { inject, Injectable } from '@angular/core';
import UserAPI from '../base-apis/base_user.service';
import User, { CredentialUser } from '../../models/user';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword } from '@angular/fire/auth';
import { collection, collectionData, doc, docData, Firestore, getDoc, getDocs, onSnapshot, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';

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

  getUserRealtime(userId: User['id']): Observable<User> {
    const docRef = doc(this._firestore, `${this.COLLECTION_NAME}/${userId}`);
    console.log(docRef);
    return docData(docRef, { idField: 'id' }).pipe(
      map(user => {
        if (!user) new Error("User Error (404): no such user information for: " + userId)
        return user as User;
      })
    );
    return new Observable<User>(observer => {
      const unsubscribe = onSnapshot(docRef, (snapshot) => {
        if (!snapshot.exists()) {
          observer.error(new Error("User Error (404): no such user information for: " + userId));
          return;
        }
        observer.next({ id: snapshot.id, ...snapshot.data() } as User);
      }, (error) => observer.error(error));
      return () => unsubscribe();
    });
  }

  async getUsers(userIdList: User['id'][]): Promise<User[]> {
    const users: User[] = [];
    for (let id of userIdList) users.push(await this.getUser(id));
    return users;
  }

  getUsersRealtime(userIdList: User['id'][]): Observable<User[]> {
    const usersQuery = query(
      collection(this._firestore, this.COLLECTION_NAME),
      where('__name__', 'in', userIdList.length > 0 ? userIdList : [''])
    );
    return collectionData(usersQuery, { idField: 'id' }).pipe(
      map(users => {
        if (users.length === 0 && userIdList.length > 0) {
          throw new Error("User Error (404): no users found for the provided IDs");
        }
        return users as User[];
      })
    );
  }

  async createUser(newUser: CredentialUser): Promise<User> {
    const credentials = await createUserWithEmailAndPassword(this._auth, newUser.email, newUser.password);

    const userCredentials = credentials.user;
    const firebaseUser: User = {
      id: userCredentials.uid,
      username: newUser.username,
      originalEmail: newUser.email,
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
    try {
      const credentials = await signInWithEmailAndPassword(this._auth, email, password);
      return this.getUser(credentials.user.uid);
    } catch {
      const emailQuery = query(
        collection(this._firestore, this.COLLECTION_NAME),
        where('email', '==', email)
      );
      const querySnapshot = await getDocs(emailQuery);
      if (querySnapshot.size < 1) throw new Error("No user with email: " + email);

      const foundUser = querySnapshot.docs.at(0)?.data() as User;
      await signInWithEmailAndPassword(this._auth, foundUser.originalEmail!, password);
      return foundUser;
    }
  }

  async updateUser(oldUserId: User['id'], newUser: User): Promise<User> {
    const docRef = doc(this._firestore, `${this.COLLECTION_NAME}/${oldUserId}`);
    const userDoc = await getDoc(docRef);
    if (!userDoc.exists()) throw new Error("User Error (404): no such user information for: " + oldUserId);

    await updateDoc(docRef, newUser as any);
    return newUser;
  }

  async changePassword(currentPassword: string, newPassword: string) {
    if (this._auth.currentUser === null) throw new Error("Current user is 'null'.");
    const authenticated = await signInWithEmailAndPassword(this._auth, this._auth.currentUser.email!, currentPassword);
    await updatePassword(authenticated.user, newPassword);
  }

  async logOut() {
    await this._auth.signOut();
  }
}
