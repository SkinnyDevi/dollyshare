import { inject, Injectable } from '@angular/core';
import FileUploadAPI, { getFileType, processFiles } from '../base-apis/base_file_upload.service';
import UploadedFile from '../../models/uploaded_file';
import { collection, deleteDoc, doc, Firestore, getDoc, getDocs, query, setDoc, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseFileUploadApiService implements FileUploadAPI {
  private _firestore = inject(Firestore);

  readonly COLLECTION_NAME = "file_storage";

  async uploadFiles(files: File[]): Promise<UploadedFile[]> {
    const processedFiles = await processFiles(files);

    const uploadedFiles: UploadedFile[] = [];
    for (let file of processedFiles) {
      file.type = file.type !== "" ? file.type : getFileType(file);
      const docRef = this.getDocRefFromId(file.id);
      await setDoc(docRef, file);
      uploadedFiles.push(file);
    }

    return uploadedFiles;
  }

  async getFileFrom(id: UploadedFile['id']): Promise<UploadedFile> {
    const docRef = this.getDocRefFromId(id);
    const fileData = await getDoc(docRef);

    if (!fileData.exists()) throw new Error("File Storage Error (404): no such file for: " + id);
    return fileData.data() as UploadedFile;
  }

  async getFilesFrom(ids: UploadedFile['id'][]): Promise<UploadedFile[]> {
    const dbCollection = collection(this._firestore, this.COLLECTION_NAME);
    const fileQuery = query(dbCollection, where('__name__', 'in', ids));
    const querySnapshot = await getDocs(fileQuery);
    return querySnapshot.docs.map(f => f.data() as UploadedFile);
  }

  async deleteFile(file: UploadedFile): Promise<void> {
    await this.deleteFileById(file.id);
  }

  async deleteFiles(files: UploadedFile[]): Promise<void> {
    const dbCollection = collection(this._firestore, this.COLLECTION_NAME);
    const fileQuery = query(dbCollection, where('__name__', 'in', files.map(f => f.id)));
    const querySnapshot = await getDocs(fileQuery);
    querySnapshot.forEach(async d => await deleteDoc(d.ref));
  }

  async deleteFileById(fileId: UploadedFile['id']): Promise<void> {
    const docRef = this.getDocRefFromId(fileId);
    try {
      await deleteDoc(docRef);
    } catch (e) {
      console.error("Couldn't delete file upload: " + e)
    }
  }

  private getDocRefFromId(id: UploadedFile['id']) {
    return doc(this._firestore, `${this.COLLECTION_NAME}/${id}`);
  }
}
