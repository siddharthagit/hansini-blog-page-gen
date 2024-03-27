import { Injectable } from '@angular/core';
import { finalize, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FileUpload, FileUpload2, FormStatus } from 'src/app/creator/models';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ArticleImageFile, ImageContent as ImageContentInfo, ImageContentData } from '../editor/models';


@Injectable()
export class UploadService {

  constructor(
    public afs: AngularFirestore,
    private storage: AngularFireStorage,
    private db: AngularFireDatabase,
    private firestore: AngularFirestore
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



  onFileChangedFS6(fp: string, event: Event) {
    console.log("onFileChangedFS6 event" + JSON.stringify(event));
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




  listImages(fp: string): ImageContentInfo[] {
    let ret: ImageContentInfo[] = [];
    console.log("listImages called fp = " + fp);
    const fileRef = this.storage.ref(fp);
    // Create a reference under which you want to list
    // var listRef = fileRef.;
    fileRef.listAll().subscribe
      ((res) => {
        res.prefixes.forEach((folderRef) => {
          // All the prefixes under listRef.
          // You may call listAll() recursively on them.
          console.log("sr" + folderRef);
        });
        res.items.forEach((itemRef) => {
          // All the items under listRef.
          let item: ImageContentInfo = new ImageContentInfo();
          itemRef.getDownloadURL().then(
            (data) => {
              console.log("ssp + " + data);
              item.file.url = data;
            }
          ).catch(err => {

          });
          item.file.name = itemRef.fullPath;
          item.caption = "image caption x";
          ret.push(item);
        });

      });

    return ret;

  }

  addImageDataDb(path: string, data: ImageContentData):Promise<any> {
    console.log("FSService updateDocument() collectionName, path =" + " " + path + " " + data);
    //Object.assign(targetData, data);
    let targetData = JSON.parse(JSON.stringify(data));
    return this.firestore.collection<any>("rootimagecontentdata").add(targetData);
  }


  onFileChangedUIStep1(event: any): Promise<ArticleImageFile> {
    console.log("onFileChangedUIStep1 event" + JSON.stringify(event));
    let aif: ArticleImageFile = new ArticleImageFile();
    let promise = new Promise<ArticleImageFile>((resolve, reject) => {
      
      if (event.target.files && event.target.files.length > 0) {
        let reader = new FileReader();
        let file = event.target.files[0];
        aif.name = file.name;
        aif.type = file.type;
          //handle locale file without storing any where
          reader.readAsDataURL(file);
          reader.onload = (d) => {
            aif.url = reader.result.toString();
            resolve(aif);
          }
        };
      
    });
    
    return promise;
    
}
  onFileChangedUI(event: any, caption:string, fbenabled: boolean, fblocal: string): Promise<ImageContentInfo> {
    //console.log("onFileChanged event" + JSON.stringify(event));
    let ic: ImageContentInfo = new ImageContentInfo();
    let aif: ArticleImageFile = new ArticleImageFile();
    let promise = new Promise<ImageContentInfo>((resolve, reject) => {
      
      if (event.target.files && event.target.files.length > 0) {
        let reader = new FileReader();
        let file = event.target.files[0];
        aif.name = file.name;
        aif.type = file.type;
        if (fbenabled) {
          //"hansini-blogfiles"
          this.onFileChangedFS6(fblocal, event).then((data: FileUpload2) => {
            console.log("upload to firebase " + JSON.stringify(data));
            aif.url = data.url;
  
            let idb:ImageContentData = new ImageContentData();
            idb.cap = caption;
            idb.fname = file.name;
            this.addImageDataDb("", idb).then(
              (data) => {
                ic.caption = idb.cap;
                ic.file = aif;
              resolve(ic);
              }
            ).catch((error) => {
              console.log(error);
              reject("error");
            });
          }).catch((error) => {
              console.log(error);
              reject("error");
            });
        }
        else {
          //handle locale file without storing any where
          reader.readAsDataURL(file);
          reader.onload = () => {
            aif.url = "";
          }
        }
  
        }
        else {
          reject("error no file");
        }
      return ic;
    });
    
    return promise;
    
}


}