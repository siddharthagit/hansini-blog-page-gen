import { Injectable } from '@angular/core';
import { from, map, Observable, of, Subscriber } from 'rxjs';
import { BlogService } from './blog.iservice';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { KeyValPair } from './models';
import { getFirestore, collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";
import { BlogDetailsData, RootObjectType, SiteConfig } from '../creator/models';

@Injectable()
export class BlogFireServiceImpl implements BlogService {
  constructor(public firestore: AngularFirestore) { }

  getPostByID(storageName: string, path: string): Observable<BlogDetailsData> {
    console.log("BlogFireServiceImpl getPostByID() id =" + path);
    //return  this.firestore.collection("rootblogstory").doc(id.toString()).get();
    return this.firestore.collection<any>(storageName).doc(path).get()
      .pipe(
        map(actions => {
          console.log("FSService action data = " + JSON.stringify(actions.data()));
          //const ret = this.hs.getDecodedObjectfromCollectionName(collectionName, actions.data());
          //return actions.data() as CreatableBlogObject;
          var jsonObject: BlogDetailsData = new BlogDetailsData();
          Object.assign(jsonObject, actions.data())
          return jsonObject;
        }));

  }

  public getTags(pageSize: number): Observable<any> {
    let tags = [{ uniqueName: "Java" }, { uniqueName: "Stocks" }];
    return new Observable<Response>((subscriber: Subscriber<any>) => subscriber.next(tags));
  }

  getCategories(pageSize: number): Observable<KeyValPair[]> {
    console.log("FSService getCategories() for coll ");

    return this.firestore.collection<any>(RootObjectType.rootcategory).snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            console.log("   data  ==  " + JSON.stringify(data));
            let gd = new KeyValPair();
            gd.key = a.payload.doc.id;
            gd.val = data["ud"]["d"];
            return gd;
          });
        }));
  }

  public getPosts(storageName: string, pageSize: number, catID: string, tagName: string): Observable<any> {
    const db = getFirestore();
    let q = query(collection(db, storageName), where("ud.z", ">", 10), limit(pageSize));
    console.log("getPosts catID" + catID);
    if (catID == "" || catID == null) {
    }
    else {
      q = query(collection(db, storageName), where("ud.z", ">", 10), where("ud.c.key", "==", catID), limit(pageSize));
    }
    let ret: BlogDetailsData[] = [];
    //return from(getDocs(q))
    (ret).push(new BlogDetailsData());
   
    return new Observable<Response>((subscriber: Subscriber<any>) => subscriber.next(ret));
  }


  public getEvents(storageName: string, pageSize: number) {
    const db = getFirestore();
    //,where("ud.z", ">", 10)
    let q = query(collection(db, storageName), limit(pageSize));
    console.log("getEvents catID");
    return getDocs(q);
  }


  addEmailForNewsLetter(path: string, data: object): Observable<Object> {
    console.log("addEmailForNewsLetter service" + JSON.stringify(path));
    //console.log("FSService updateDocument() collectionName, path =" + collectionName, + " " + path + " " + data);
    let targetData = JSON.parse(JSON.stringify(data));
    return new Observable<Response>((subscriber: Subscriber<any>) => subscriber.next(targetData));
    //return this.firestore.collection<any>("rootnewsletteremails").doc(path).set(targetData)
  }
}
