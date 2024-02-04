import { ThisReceiver } from "@angular/compiler";
import { Timestamp } from "rxjs";
import { Author } from "../dblog/models";
import { ArticleContent, DisplayFragmentMe } from "../editor/models";

/**
Naming Convention:
  *Info (like SEOInfo) -> that is a supporting object (part of bigger object)
  *Object (like CreatorAuthorObject, BlogWebpageObject) -> that can be persisted
  *Content (like H2Content, ArticleContent)-> used for the UI only  
  *DisplayFragmentMe object that generate main contents
  CreatableObject-> Based object that can be persisted
  WebpageView-> Based object that can be rendered
*/ 

export class GridObject {
  public _id: string;
  public name: string;
  public updatedDateTime: Date;
  public syncDateTime: Date;
  public status: number;
  constructor(id?: string, name?: string ) {
    this._id = id;
    this.name = name;
    }
}

/**
 * Base class which can be saved in DB
 */
export abstract class CreatableObject {
  public _id: string;
  public lsid: string;
  public _rev: string;
  public ud: Date;
  public created: Date;
  public status: number;
  
  constructor(id?: string, name?: string ) {
    this._id = id;
    this.lsid = id;
    }
}

export class SEOInfo {
  t: string // todo
  k: string //keywords
  d: string //description
  p: string //published date
  constructor() {
    this.k = "";
    this.d = "";
  }
}
export class CreatorAuthorObject extends CreatableObject {
  u: String;
  e: string = "";  //email
  f: string;       //fname
  l: string;       //lname
  p:string;        //photourls

  constructor() {
    super();
    this.u = "";
    this.e = "";
    this.p = "";
    this.f = "";
    this.l = "";
  }
}

export class WebpageView  {
}
export class BlogWebpageListView extends WebpageView {
  public seo: SEOInfo;
  public pre:PreambleInfo;
  public displayWidgets: DisplayFragmentMe[];

  constructor(id?: string, name?: string) {
    super();
    this.pre = new PreambleInfo();
    this.displayWidgets =  new Array<ArticleContent>();
  }
}
export class BlogWebpageObject extends CreatableObject {
  public seo: SEOInfo;
  public pre:PreambleInfo;
  public name: string;
  //public summary: string;
  //public description: string;
  //public mainImage: string;
  public displayWidgets: DisplayFragmentMe[];

  constructor(id?: string, name?: string) {
    super();
    this._id = id;
    this.lsid = id;
    this.name = name;
    this.pre = new PreambleInfo();
    this.displayWidgets =  new Array<ArticleContent>();
  }

  decodeBlog(json: Object): BlogWebpageObject {
    let user = Object.create(BlogWebpageObject.prototype);
    return Object.assign(user, json, {
    });
  }
}


export class ViewInfo {
  
  v: number = 100;      //vno
  c: number = 100;      //cno

  constructor() {
  }
}
export class PreambleInfo {
  tle: string = ""; //title
  summ: string = ""; //summary
  cat: KeyValPair = new KeyValPair(); //Category
  des: string = ""; //Description
  img: any = ""; //Image
  dte: string = "published on x"; //publish date
  aut: AuthorInfo;
  vi: ViewInfo;
  constructor () {
    this.cat = new KeyValPair();
  }
}
export class HansiniInfo {
  a: CreatorAuthorObject = new CreatorAuthorObject();
  b: string = "";                     //Author ref
  i: ViewInfo = new ViewInfo();
}

export class AuthorInfo {
  f: string = "";
  i: string = "../assets/img/writer.png";
}



export class KeyValPair {
  key: string;
  val: string;
  constructor(k?:string, v?: any) {
    this.key = k!;
    this.val = v;
  }
}

//////////////////
