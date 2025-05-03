import { inject, Injectable } from '@angular/core';
import ShareTextAPI from '../base-apis/base_share_text.service';
import SharedText from '../../models/shared_text';
import { v4 as uuid } from 'uuid';
import { collection, doc, docData, Firestore, getDoc, getDocs, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { addDoc, deleteDoc, DocumentReference, Primitive } from 'firebase/firestore';
import { map,Observable } from 'rxjs';
import User from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class FirebaseShareTextApiService implements ShareTextAPI {

  private _firestore = inject(Firestore);
  private COLLECTION_NAME = "text_uploads";
  public readonly SHARED_TEXT_LIFETIME_DAYS = 5;

  async createUpload(title: string, body: string, owner: User | null = null, shareWith: User[] = []): Promise<SharedText> {
    let expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + this.SHARED_TEXT_LIFETIME_DAYS);

    const upload: SharedText = {
      id: uuid(),
      title: btoa(unescape(encodeURIComponent(title))),
      body: btoa(unescape(encodeURIComponent(body))),
      owner: owner !== null ? owner.id : null,
      sharedWith: shareWith.map(u => u.id),
      expires: expiryDate.getTime()
    };

    const docRef = doc(this._firestore,`${this.COLLECTION_NAME}/${upload.id}`);
    await setDoc(docRef, upload);
    return upload;
  }

  async deleteUploadById(uploadId: SharedText['id']) {
    const docRef = this.getDocRefFromId(uploadId);
    try {
      await deleteDoc(docRef);
    }catch (e) {
      console.error("Error deleting document: ", e);
    }
  }

  getDocFromId(uploadId: SharedText['id']): Observable<SharedText>{
    const docRef = this.getDocRefFromId(uploadId);
    const document = docData(docRef, { idField: 'id' }); 
    if (!document) {
      throw new Error("No such document in the collection!");
    } 
    return document as Observable<SharedText>;
  }

  getUploadsFromUser(user: User): Promise<SharedText[]> {
    throw new Error('Method not implemented.');
  }

  getUploadById(uploadId: SharedText['id']): Promise<SharedText> {
    throw new Error('Method not implemented.');
  }

  deleteUpload(sharedText: SharedText): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async shareUploadWith(user: User, upload: SharedText): Promise<SharedText> {
    upload.sharedWith.push(user.id);
    const docRef = this.getDocRefFromId(upload.id);
    await updateDoc(docRef, { sharedWith: upload.sharedWith });
    return upload;
  }

  async stopSharingUploadWith(user: User, upload: SharedText): Promise<SharedText> {
    const docRef = this.getDocRefFromId(upload.id);
    upload.sharedWith = upload.sharedWith.filter(id => id != user.id);
    await updateDoc(docRef, { sharedWith: upload.sharedWith });
    return upload;
  }

  private getDocRefFromId(id: string): DocumentReference {
    return doc(this._firestore, `${this.COLLECTION_NAME}/${id}`);
  }
}
