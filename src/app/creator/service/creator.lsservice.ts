import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryInfo } from 'src/app/editor/models';
import { AuthorInfo, KeyValPair, SiteConfig } from '../models';
import { CreatorIService } from './creator.iservice';


@Injectable()
export class CreatorLSService implements CreatorIService{
   
    constructor() {
    }

    public createPageId(): string {
        var randomNumberBetween111111and999999 = 100000 + Math.floor(Math.random() * 899999);
        return randomNumberBetween111111and999999 + "";
    }

    getSiteConfig(): Observable<SiteConfig> {
        throw new Error('Method not implemented.');
    }

    getObjectByID(storeName: string, lsid:string):any {
        let retObject = JSON.parse(localStorage.getItem(lsid));
        return retObject;
    }


    saveObject(localStoreName: string, lsid: string, pageData: object) {
        //addOrUpdateObjectToLS
        console.log("addOrUpdateObjectWithKeyToLS");
        if (localStoreName == null || pageData == null) {
            console.log("localStoreName or pageData is null ");
            //return;
        }
        let lSString = localStorage.getItem(localStoreName);
        let isFound = false;
        let lSObject = null

        if (lSString != null) {
            lSObject = JSON.parse(lSString);
            lSObject.forEach((t) => {
                if (t === lsid) {
                    console.log("Object already stored in LS");
                    isFound = true;
                }
            });
        }
        else {
            lSObject = [];
        }
        if (!isFound) {
            lSObject.push(lsid);
            localStorage.setItem(localStoreName, JSON.stringify(lSObject));
        }
        localStorage.setItem(lsid, JSON.stringify(pageData));
    }

   
   

    public getAllObjects(storeName: string): any[] {
        let lSString = localStorage.getItem(storeName);
        let lSObject = null
        let retObjectArray: Array<object> = [];
        if (lSString != null) {
            lSObject = JSON.parse(lSString);
            lSObject.forEach((t) => {
                let thisObject = JSON.parse(localStorage.getItem(t));
                retObjectArray.push(thisObject);
            });
        }
        return retObjectArray;
    }

    public clearLS(): void {
        localStorage.clear();
    }

    public clearStore(storageName: string): void {
        let lSString = localStorage.getItem(storageName);
        let lSObject = null
        if (lSString != null) {
            lSObject = JSON.parse(lSString);
            lSObject.forEach((t) => {
                localStorage.removeItem(t);
            });
        }
        localStorage.removeItem(storageName);
    }

    public deleteByID(storageName: string, id: string): void {
        console.log("removeSpecificEntryWithIDFromNamedLS invoked " + storageName + " " + id);
        let lSString = localStorage.getItem(storageName);
        if (lSString != null) {
            let lSObject = JSON.parse(lSString);

            lSObject.forEach((val, index) => {
                if (val == id) {
                    //localStorage.removeItem(val);
                    console.log(val);
                    lSObject.splice(index,1);
                    localStorage.setItem(storageName, JSON.stringify(lSObject));

                    return;
                }
            });
        }
        // localStorage.removeItem(storageName);
    }

    getAllCategoriesStatic(): CategoryInfo {
        let info = new CategoryInfo();
        info.cats[0] = new KeyValPair("1", "Java");
        info.cats[1] = new KeyValPair("1", "Angular");
        info.cats[2] = new KeyValPair("1", "Spring Boot");
        info.cats[3] = new KeyValPair("1", "AI");
        info.cats[4] = new KeyValPair("1", "Refactor");
        info.cats[4] = new KeyValPair("1", "Microservice");
        info.cats[0] = new KeyValPair("1", "Library");
       return info;
    }

    getAllUsersStatic(): Array<AuthorInfo> {
        let result = [];
        result[0] = new AuthorInfo("100", "Admin", "Root");
        result[1] = new AuthorInfo("101", "Sidd", "Bhattacharjee");
       
       return result;
    }
}
