import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { FileUploadService } from './apis/file-upload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public fileDetails:any;
  public uploadedFile:File;

  @ViewChild("fileUpload", {static: true}) 
  public fileUpload: ElementRef; 
  private _progressBarPercentage=0;
  public isUploadStarted = false;

  public set progressBarPercentage(value){
    this._progressBarPercentage=value;
  }

  public get progressBarPercentage(){
    return this._progressBarPercentage;
  }

  public constructor(private fileUploadService:FileUploadService){}
  
  public handleFileInput(files: FileList) {
    this.uploadedFile = files.item(0);
    this.fileDetails = this.uploadedFile ? 
    {
      name: this.uploadedFile.name,
      size: this.getFileSize(this.uploadedFile.size),
      type: this.getFileType(this.uploadedFile.type)
    } : null
    this.progressBarPercentage  = 0;
  }


  public getFileSize(fileSize){
    return Math.round(fileSize/1024);
  }

  public getFileType(fileType){
    return fileType.split('/')[0].toUpperCase();
  }
  
  public uploadFile(){
    if(this.fileDetails){
      this.progressBarPercentage = 0;
      this.isUploadStarted = true;
      this.fileUploadService.uploadFile(this.uploadedFile)
      .subscribe(
        event => {
          if (event.type == HttpEventType.UploadProgress) {
            this.progressBarPercentage = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.isUploadStarted = false;
            alert("File uploaded successfullly");
          }
        },
        (err) => {
          console.log("Upload Error:", err);
          this.isUploadStarted = false;
        }
      )
    }
  }

  public reset(){
    this.progressBarPercentage = 0;
    this.fileDetails = null;
    this.uploadFile = null;
    this.fileUpload.nativeElement.value =null;
  }
}
