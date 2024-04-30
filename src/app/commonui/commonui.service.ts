import { Injectable } from '@angular/core';
// import { HttpClient} from '@angular/common/http';
import { from, map, Observable, of, Subscriber } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SiteConfig } from '../creator/models';

@Injectable()
export class CommonUIService{
  constructor(public firestore: AngularFirestore) { }
  getSiteConfig(): Observable<SiteConfig> {
    let collectionName = "rootsiteconfig";
    let path = "sitedtails";
    console.log("CommonUIService getSiteConfig() collectionName, path =" + collectionName + " " + path);
    return this.firestore.collection<any>(collectionName).doc(path).get()
    .pipe(
      map(actions => {
        console.log("CommonUIService action data = " + JSON.stringify(actions.data()));
        return actions.data();
      }));
  }

  public getTags(pageSize:number): Observable<any> {
    let tags = [{ uniqueName: "Java"} , { uniqueName: "Stocks"}];
    return new Observable<Response>((subscriber: Subscriber<any>) => subscriber.next(tags));
}

public getCategories(pageSize:number): Observable<any> {
    console.log("Service getCategories");
    let categories = [{ uniqueName: "Technology", count:10} , { uniqueName: "Finance", count:15}];
    return new Observable<Response>((subscriber: Subscriber<any>) => subscriber.next(categories));
}
}
