import {inject, Injectable} from '@angular/core';
import ShareFilesAPI from '../base-apis/base_share_files.service';
import UploadedFile from '../../models/uploaded_file';
import SharedFiles from '../../models/shared_files';
import {collection, deleteDoc, doc, Firestore, getDoc, getDocs, query, setDoc, where} from '@angular/fire/firestore';
import User from '../../models/user';
import {v4 as uuid} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class FirebaseShareFilesApiService implements ShareFilesAPI {
  public readonly SHARED_FILES_LIFETIME_DAYS: number = 5;
  private _firestore = inject(Firestore);
  private COLLECTION_NAME = "file_storage";

  async getUpload(uploadId: SharedFiles['id']): Promise<SharedFiles> {
    const docRef = doc(this._firestore, `${this.COLLECTION_NAME}/${uploadId}`);
    const userDoc = await getDoc(docRef);

    if (!userDoc.exists()) throw new Error("User Error (404): no such user information for: " + uploadId);
    return userDoc.data() as SharedFiles;
  }

  async getUploadsFromUser(user: User): Promise<SharedFiles[]> {
    const dbCollection = collection(this._firestore, this.COLLECTION_NAME);
    const fileQuery = query(dbCollection, where('owner', '==', user.id));
    const firebaseData = await getDocs(fileQuery);
    return firebaseData.docs.map(f => f.data() as SharedFiles);
  }

  async createUpload(files: UploadedFile[], owner: User | null = null, shareWith: User[] = []): Promise<SharedFiles> {
    const mappedFileIds = files.map(f => f.id);
    const totalSize = files.map(f => f.size).reduce((f1, f2) => f1 + f2);
    const sharedWithIds: string[] = shareWith.map(u => u.id);
    let expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + this.SHARED_FILES_LIFETIME_DAYS);

    const upload: SharedFiles = {
      id: uuid(),
      owner: owner !== null ? owner.id : null,
      size: totalSize,
      expires: expiryDate.getTime(),
      sharedWith: sharedWithIds,
      files: mappedFileIds
    }

    const docRef = doc(this._firestore, `${this.COLLECTION_NAME}/${upload.id}`);
    await setDoc(docRef, upload);
    return upload;
  }

  async deleteUpload(sharedFiles: SharedFiles): Promise<void> {
    await this.deleteUploadById(sharedFiles.id);
  }

  async deleteUploadById(uploadId: SharedFiles["id"]): Promise<void> {
    const docRef = this.getDocRefFromId(uploadId);
    try {
      await deleteDoc(docRef);
    } catch (e) {
      console.error("Couldn't delete file upload: " + e)
    }
  }

  shareUploadWith(user: User, upload: SharedFiles): Promise<SharedFiles> {
    throw new Error("Method not implemented.");
  }

  stopSharingUploadWith(user: User, upload: SharedFiles): Promise<SharedFiles> {
    throw new Error("Method not implemented.");
  }

  private getDocRefFromId(id: UploadedFile['id']) {
    return doc(this._firestore, `${this.COLLECTION_NAME}/${id}`);
  }

}
