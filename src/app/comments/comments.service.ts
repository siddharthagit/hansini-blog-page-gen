import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, getDocs, getFirestore, limit, query, where } from 'firebase/firestore';
import { Observable, Subscriber } from 'rxjs';
const MY_TODO_PAGES_ARRAY = "MyPageIdsA"; //contains id of the TodoPages I created, assigned to me.

@Injectable()
export class CommentsService {
    constructor(public firestore: AngularFirestore) { }
    
    public getCommentsLocal(postid: string, storageName: string, pageSize: number): Observable<any> {
        let lSString = localStorage.getItem(storageName);
        let lSObject = null
        let retObjectArray: Array<object> = [];
        if (lSString != null) {
            lSObject = JSON.parse(lSString);
            lSObject.forEach((t: any) => {
                let thisObject = JSON.parse(localStorage.getItem(t) || "");
                //if (thisObject != null)
                retObjectArray.push(thisObject);
            });
        }
        console.log("getBloglist::  " + JSON.stringify(retObjectArray));
        return new Observable<Response>((subscriber: Subscriber<any>) => subscriber.next(retObjectArray));
    }

    getComments(docid: string) {
        let pageSize = 100;
        const db = getFirestore();
        //show all status posts
        let  q =  query(collection(db, "rootcomments"), where("p", "==", docid), limit(pageSize));
        return getDocs(q);
    }

    addComment(path: string, data: object): Promise<void> {
        console.log("addComments service" + JSON.stringify(path));
        //console.log("FSService updateDocument() collectionName, path =" + collectionName, + " " + path + " " + data);
        let targetData = JSON.parse(JSON.stringify(data));
        return this.firestore.collection<any>("rootcomments").doc(path).set(targetData)
    }

}
