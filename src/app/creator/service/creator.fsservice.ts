import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { RootCreatableObject, SiteConfig } from '../models';
import { CreatorIService } from './creator.iservice';
import { getFirestore, collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";


@Injectable()
export class CreatorFSService implements CreatorIService{
   
    constructor(public firestore: AngularFirestore) { }

    public createPageId(): string {
        var randomNumberBetween111111and999999 = 100000 + Math.floor(Math.random() * 899999);
        return randomNumberBetween111111and999999 + "";
    }

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

    getObjectByID(storeName: string, lsid: string):any  {
        console.log("BlogFireServiceImpl getPostByID() id = " + lsid);
        //return  this.firestore.collection("rootblogstory").doc(id.toString()).get();
        return this.firestore.collection<any>(storeName).doc(lsid).get()
            .pipe(
                map(actions => {
                    console.log("FSService action data = " + JSON.stringify(actions.data()));
                    //const ret = this.hs.getDecodedObjectfromCollectionName(collectionName, actions.data());
                    //return actions.data() as CreatableBlogObject;
                    var jsonObject: object = new RootCreatableObject();
                    Object.assign(jsonObject, actions.data())
                    return jsonObject;
                }));
    }

    saveObject(storeName: string, lsid: string, pageData: object) {
        console.log("saveObjectFS service path" + JSON.stringify(lsid));
        let targetData = JSON.parse(JSON.stringify(pageData));
        this.firestore.collection<any>(lsid).doc(lsid).set(targetData)
    }


    deleteByID(storageName: string, id: string): void {
        throw new Error('Method not implemented.');
    }

    getAllObjects(storeName: string): any {
        console.log("getAllObjects" + storeName);
        const db = getFirestore();
        let q = query(collection(db, storeName), orderBy("active"), limit(30));
        return getDocs(q);
    }
}

