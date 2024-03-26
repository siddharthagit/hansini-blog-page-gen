import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FileUpload, FileUpload2, FormStatus } from 'src/app/creator/models';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireDatabase } from '@angular/fire/compat/database';


@Injectable()
export class UploadService {

  constructor(private http: HttpClient,
    public afs: AngularFirestore,
    private storage: AngularFireStorage,
    private db: AngularFireDatabase
  ) {

  }

  uploadImage(fp: string, fileUpload: FileUpload) {
    console.log("uploadImage called fp = " + JSON.stringify(fileUpload));
    const randomId = Math.random().toString(36).substring(2);
    fp = fp + "/" + randomId;
    console.log("uploadImage called fp = " + fp);
    const fileRef = this.storage.ref(fp);
    const task = this.storage.upload(fp, fileUpload.file);
    return task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(downloadURL => {
            return downloadURL;
          })
        })
      )
  }

  onFileChanged5(event: any): Promise<any> {
    console.log("onFileChanged event" + JSON.stringify(event));
    let filePreview: any = "";
    if (event.target.files && event.target.files.length > 0) {
      let reader = new FileReader();
      let file = event.target.files[0];
      //console.log("onFileChanged file " + JSON.stringify(file));
      reader.readAsDataURL(file);
      reader.onload = () => {
        let fileMeta = { name: file.name, type: file.type };
        //console.log("done" + JSON.stringify(reader.result));
        filePreview = JSON.stringify(reader.result);//'data:image/png' + ';base64,' + reader.result.slice(',')[1];
      };
    }

    return filePreview;
  }

  onFileChanged(event: any) {
    let promise = new Promise(function (resolve, reject) {
      if (event.target.files && event.target.files.length > 0) {
        let reader = new FileReader();
        let file = event.target.files[0];
        //console.log("onFileChanged file " + JSON.stringify(file));
        reader.readAsDataURL(file);
        reader.onload = () => {
          let fileMeta = { name: file.name, type: file.type };
          //console.log("done" + JSON.stringify(reader.result));
          let filePreview = reader.result;//'data:image/png' + ';base64,' + reader.result.slice(',')[1];
          resolve(filePreview);
        };

      }
      else {
        reject("no file selected");
      }
    });
    return promise;
  }


  onFileChangedFS5(fp: string, event: Event) {
    console.log("onFileChangedFS5 event" + JSON.stringify(event));
    let status: FormStatus = new FormStatus();
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    console.log(files)
    let file: File | null = files.item(0);
    let promise = new Promise((resolve, reject) => {
      let fileUpload: FileUpload = new FileUpload(file);
      const randomId = Math.random().toString(36).substring(2);
      fp = fp + "/" + randomId;
      const fileRef = this.storage.ref(fp);
      const task = this.storage.upload(fp, fileUpload.file);
      return task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(downloadURL => {
              return downloadURL;
            })
          })
        ).subscribe(data => {
          data?.ref?.getDownloadURL().then(
            (data) => {
              resolve(data);
            }
          ).catch(err => {
            status.msg = "error occured while uploading";
            status.key = -1;
            console.log("error" + err);
            reject(status);
          });
        });
    });

    return promise;
  }

  onFileChangedFS6(fp: string, event: Event) {
    console.log("onFileChangedFS6 event" + JSON.stringify(event));
    let status: FormStatus = new FormStatus();
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    console.log(files)
    let promise = new Promise((resolve, reject) => {
      if (files.item(0) != null) {
        let file: File | null = files.item(0);
        let fileUpload: FileUpload2 = new FileUpload2();
        const randomId = Math.random().toString(36).substring(2);
        fileUpload.name = file?.name || randomId;
        fp = fp + "/" + fileUpload.name;
        const fileRef = this.storage.ref(fp);
        const task = this.storage.upload(fp, file);
        task.then(snap => {
          if (snap.state === 'success') {
            snap?.ref?.getDownloadURL().then(
              (data) => {
                fileUpload.url = data;
                resolve(fileUpload);
              }
            )
          }
        }).catch(() => {
          reject("error");
        });
      }
      else {
        reject("no file choosen");
      }

    });

    return promise;
  }


  onFileChangedFS(event: Event) {
    console.log("onFileChangedFS event" + JSON.stringify(event));
    let status: FormStatus = new FormStatus();
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    console.log(files)
    let file: File | null = files.item(0);
    if (file != null) {
      let fileUpload: FileUpload = new FileUpload(file);
      this.uploadImage("hansini-blogfiles", fileUpload).subscribe(data => {
        data?.ref?.getDownloadURL().then(
          (data) => {
            return data
          }
        ).catch(err => {
          status.msg = "error occured while uploading";
          status.key = -1;
          console.log("error" + err);
        });
      });
    }
  }




}


