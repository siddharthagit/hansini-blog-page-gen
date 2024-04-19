import { Observable } from "rxjs";
import { SiteConfig } from "../models";

export interface CreatorIService {

     createPageId():string;

     getSiteConfig(): Observable<SiteConfig>;

     getObjectByID(storeName: string, lsid:string, pageData: object):any;

     saveObject(storeName: string, lsid:string, pageData: object):any;
     
     
}
