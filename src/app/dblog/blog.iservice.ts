import { Observable } from "rxjs";
import { SiteConfig } from "../creator/models";
import { KeyValPair } from './models';

export interface BlogService {

     getPostByID(storageName:string, id:string): Observable<any>;

     //getPosts(storageName:string, pageSize:number): Observable<any>;
     getPosts(storageName:string, pageSize:number, catID:string, tagName:string):any;

     getCategories(pageSize:number): Observable<KeyValPair[]> ;

     getTags(pageSize:number):Observable<KeyValPair[]> ;

     addEmailForNewsLetter(path: string, data: object): Observable<Object> ;
}
