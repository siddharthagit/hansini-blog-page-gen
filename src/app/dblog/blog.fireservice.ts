import { Injectable } from '@angular/core';
// import { HttpClient} from '@angular/common/http';
import { from, map, Observable, of, Subscriber } from 'rxjs';
import { throwError } from 'rxjs';
import { BlogService } from './blog.iservice';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {  KeyValPair,  SiteConfig } from './models';
const MY_TODO_PAGES_ARRAY = "MyPageIdsA"; //contains id of the TodoPages I created, assigned to me.
import { getFirestore, collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";

import { initializeApp } from "firebase/app"
import { BlogDetailsData, RootObjectType } from '../creator/models';
//import { RootObjectType } from 'extra/models';

@Injectable()
export class BlogFireServiceImpl implements BlogService {
  constructor(public firestore: AngularFirestore) { }
  getSiteConfig(): Observable<SiteConfig> {
    let collectionName = "rootsiteconfig";
    let path = "sitedtails";
    console.log("FSService getSiteConfig() collectionName, path =" + collectionName + " " + path);
    return this.firestore.collection<any>(collectionName).doc(path).get()
    .pipe(
      map(actions => {
        console.log("FSService action data = " + JSON.stringify(actions.data()));
        return actions.data();
      }));
  }

  getPostByID(storageName: string,  path:string): Observable<BlogDetailsData> {
    console.log("BlogFireServiceImpl getPostByID() id =" + path );
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

  /*
  getPostByID(id:string): Observable<any> {
    console.log("BlogFireServiceImpl getPostByID() id =" + id );
    var docRef = this.firestore.collection("rootblogstory").doc(id);
    let storedObject = {};
    docRef.get().suscribe(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            //storedObject = new BlogDetails().decodeObject(doc.data());
            storedObject = doc.data();
            console.log("Document data: storedObject", JSON.stringify(storedObject));
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    })
    return new Observable<Response>((subscriber: Subscriber<any>) => subscriber.next(storedObject));
  }*/

  public getPostByIDOld(id:string): Observable<any> {
    console.log("Service getBlogStoryDetails");
    let storedObject = this.firestore;

    if (storedObject == null) {
        console.log("Service getBlogStoryDetails not found");
        throw throwError("Object with id " + id + "  not found");
        //throw Observable.throw("Service getBlogStoryDetails not found");
    }
    else
    return new Observable<Response>((subscriber: Subscriber<any>) => subscriber.next(storedObject));
}

    public getTags(pageSize:number): Observable<any> {
        let tags = [{ uniqueName: "Java"} , { uniqueName: "Stocks"}];
        return new Observable<Response>((subscriber: Subscriber<any>) => subscriber.next(tags));
    }

  

    getCategories(pageSize:number): Observable<KeyValPair[]> {
      console.log("FSService getCategories() for coll " );

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

      public getPosts(storageName:string, pageSize:number, catID:string, tagName:string):Observable<any> {
          const db = getFirestore();
          let q = query(collection(db, storageName),where("ud.z", ">", 10), limit(pageSize));
          console.log("getPosts catID" + catID );
          if (catID == "" || catID == null) {
          }
          else {
               q = query(collection(db, storageName),where("ud.z", ">", 10), where("ud.c.key", "==", catID), limit(pageSize));
          }
          let ret: BlogDetailsData[] = [];
          //return from(getDocs(q))
          (ret).push(new BlogDetailsData());
          (ret).push(new BlogDetailsData());

          //return getDocs(q);
          return new Observable<Response>((subscriber: Subscriber<any>) => subscriber.next(ret));

      }



    public getEvents(storageName:string, pageSize:number) {
      const db = getFirestore();
      //,where("ud.z", ">", 10)
      let q = query(collection(db, storageName), limit(pageSize));
      console.log("getEvents catID"  );
    
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


function firebaseApp(firebaseApp: any) {
  throw new Error('Function not implemented.');
}
