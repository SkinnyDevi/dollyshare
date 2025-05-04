import { inject, Injectable } from '@angular/core';
import ShareTextAPI from '../base-apis/base_share_text.service';
import SharedText from '../../models/shared_text';
import { v4 as uuid } from 'uuid';
import { collection, collectionData, deleteDoc, doc, docData, Firestore, getDoc, getDocs, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
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

    const docRef = doc(this._firestore, `${this.COLLECTION_NAME}/${upload.id}`);
    await setDoc(docRef, upload);
    return upload;
  }

  async deleteUploadById(uploadId: SharedText['id']) {
    const docRef = this.getDocRefFromId(uploadId);
    try {
      await deleteDoc(docRef);
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  }

  async getUploadsFromUser(user: User): Promise<SharedText[]> {
    const userQuery = query(
      collection(this._firestore, this.COLLECTION_NAME),
      where('owner', '==', user.id)
    );
    const filteredDocs = await getDocs(userQuery);
    return filteredDocs.docs.map(f => f.data() as SharedText);
  }

  getUploadsFromUser$(user: User): Observable<SharedText[]> {
    const userQuery = query(
      collection(this._firestore, this.COLLECTION_NAME),
      where('owner', '==', user.id)
    );
    return collectionData(userQuery, { idField: 'id' }) as Observable<SharedText[]>;
  }

  async getUploadById(uploadId: SharedText['id']): Promise<SharedText> {
    const docRef = this.getDocRefFromId(uploadId);
    const fileData = await getDoc(docRef);

    if (!fileData.exists()) throw new Error("Text upload Error (404): no such text upload for: " + uploadId);
    return fileData.data() as SharedText;
  }

  getUploadById$(uploadId: SharedText['id']): Observable<SharedText> {
    const docRef = this.getDocRefFromId(uploadId);
    return docData(docRef, { idField: 'id' }).pipe(
      map((text: any) => {
        if (!text) throw new Error("Document not found")
        text.title = decodeURIComponent(escape(atob(text.title)));
        text.body = decodeURIComponent(escape(atob(text.body)));
        return text as SharedText;
      })
    );
  }

  async deleteUpload(sharedText: SharedText): Promise<void> {
    const docRef = this.getDocRefFromId(sharedText.id);
    await deleteDoc(docRef);
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

  private getDocRefFromId(id: string) {
    return doc(this._firestore, `${this.COLLECTION_NAME}/${id}`);
  }
}
