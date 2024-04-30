import { Observable } from "rxjs";
import { SiteConfig } from "../models";

export interface CreatorIService {

     createPageId():string;

     getSiteConfig(): Observable<SiteConfig>;

     getObjectByID(storeName: string, lsid:string):any;
     
     saveObject(storeName: string, lsid:string, pageData: object):any;

     deleteByID(storageName: string, id: string): void
     
     getAllObjects(storeName: string): any[] 

     
}
