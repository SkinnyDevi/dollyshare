import { Component } from '@angular/core';
import { AppButtonComponent } from "../../components/app-button/app-button.component";
import { LogoComponent } from "../../components/logo/logo.component";

@Component({
  selector: 'app-download-file',
  standalone: true,
  imports: [AppButtonComponent, LogoComponent],
  templateUrl: './download-file.component.html',
  styleUrl: './download-file.component.css'
})
export class DownloadFileComponent {
  value: FileSystemItem | undefined;
}
export interface FileSystemItem{
  name():string;
  expire():Date;
  size():number;
}
export class FileItem implements FileSystemItem{
    private fileName:string;
    private expireDate:Date;
    private fileSize:number;
  constructor(name:string , date:Date, size:number){
    this.fileName=name;
    this.expireDate=date;
    this.fileSize=size; 
  }
  size(): number {
    return this.fileSize;
  }
  name(): string {
    return this.fileName;
  }
  expire(): Date {
    return this.expireDate;
  }
}
export class FolderItem implements FileSystemItem{
  private files: FileSystemItem[];
  private folname: string;
  private expireDate:Date;
  private folsize:number;
  constructor(name:string , date:Date, size:number){
    this.files=[];
    this.folname = name;
    this.expireDate=date;
    this.folsize=size;
  }
  name(): string {
    return this.folname;
  }
  expire(): Date {
    return this.expireDate;
  }
  size(): number {
    return this.folsize;
  }
  folderItems(){
    return this.files;
  }
  
}