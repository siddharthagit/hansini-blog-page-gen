import { Injectable } from '@angular/core';
import { AppConstants } from "../app.constants";

@Injectable()
export class CreatorService {
    thisPageId: string;
    thisPageArrayId: string
    localStoreEditName: string
    localStoreSearchName: string

    constructor() {
        this.localStoreEditName = AppConstants.localStoreEditName;
        this.localStoreSearchName = AppConstants.localStoreSearchName;
    }

    public createPageId(): string {
        var randomNumberBetween111111and999999 = 100000 + Math.floor(Math.random() * 899999);
        return randomNumberBetween111111and999999 + "";
    }

    //Local Store Related

    public addOrUpdateObjectToLS(localStoreName: string, pageData: object) {
        console.log("addOrUpdateObjectToLS");
        if (localStoreName == null || pageData == null) {
            console.log("localStoreName or pageData is null ");
            //return;
        }
        console.log("addOrUpdateObjectToLS pageData['lsid'] = " + pageData['lsid']);
        let lSString = localStorage.getItem(localStoreName);
        let isFound = false;
        let lSObject = null

        if (lSString != null) {
            lSObject = JSON.parse(lSString);
            lSObject.forEach((t) => {
                if (t === pageData['lsid']) {
                    console.log("Object already stored in LS");
                    isFound = true;
                }
            });
        }
        else {
            lSObject = [];
        }
        if (!isFound) {
            lSObject.push(pageData['lsid']);
            localStorage.setItem(localStoreName, JSON.stringify(lSObject));
        }
        localStorage.setItem(pageData['lsid'], JSON.stringify(pageData));
    }

    public findObjectByIDFromLS(objectLSID: string): any {
        let retObject = JSON.parse(localStorage.getItem(objectLSID));
        return retObject;
    }

    public getObjectsFromLS(storageName: string): any[] {
        let lSString = localStorage.getItem(storageName);
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

    public removeAlldEntryFromNamedLS(storageName: string): void {
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

    public removeSpecificEntryWithIDFromNamedLS(storageName: string, id: string): void {
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


    public addOrUpdateObjectWithKeyToLS(localStoreName: string, lsid:string, pageData: object) {
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
}
