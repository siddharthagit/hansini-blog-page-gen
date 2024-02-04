import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { throwError } from 'rxjs';
import { BlogService } from './blog.iservice';
import { KeyValPair, SiteConfig } from './models';
const MY_TODO_PAGES_ARRAY = "MyPageIdsA"; //contains id of the TodoPages I created, assigned to me.

@Injectable()
export class BlogLSServiceImpl implements BlogService {
    constructor() { }
    addEmailForNewsLetter(path: string, data: object): Observable<Object> {
        console.log("addEmailForNewsLetter service" + JSON.stringify(path));
        let targetData = JSON.parse(JSON.stringify(data));
        return new Observable<Response>((subscriber: Subscriber<any>) => subscriber.next(targetData));
    }

    getSiteConfig(): Observable<SiteConfig> {
        //throw new Error('Method not implemented.');
        let siteConfig:SiteConfig = new SiteConfig();
        return new Observable<SiteConfig>((subscriber: Subscriber<any>) => subscriber.next(siteConfig));
    }

    public getPostByID(id: string): Observable<any> {
        console.log("BlogLSServiceImpl getBlogStoryDetails id = " + id);
        let storedObject = JSON.parse(localStorage.getItem(id) || "");
        if (storedObject == null) {
            console.log("Service getBlogStoryDetails not found");
            throw throwError("Object with id " + id + "  not found");
            //throw Observable.throw("Service getBlogStoryDetails not found");
        }
        else
            return new Observable<Response>((subscriber: Subscriber<any>) => subscriber.next(storedObject));
    }



    getPosts(storageName: string, pageSize: number, catID: string, tagName: string): Observable<any> {
        console.log("Storage name::  " + storageName);
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

    getCategories(pageSize: number): Observable<KeyValPair[]> {
        let retObjectArray: Array<object> = [];
        return new Observable<KeyValPair[]>((subscriber: Subscriber<any>) => subscriber.next(retObjectArray));
    }
    public getTags(pageSize: number): Observable<any> {
        let tags = [{ uniqueName: "Java" }, { uniqueName: "Stocks" }];
        return new Observable<Response>((subscriber: Subscriber<any>) => subscriber.next(tags));
    }
}
