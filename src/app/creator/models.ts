import { ThisReceiver } from "@angular/compiler";
import { Timestamp } from "rxjs";
import { Author } from "../dblog/models";
import { ArticleContent, ArticlePara, DisplayMe, DisplaySummeryMe } from "../editor/models";

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


export class BlogDetailsData extends CreatableObject {
  public seo: SEOInfo;
  public name: string;
  public pre:PreambleInfo;
  public paras: ArticlePara[];

  constructor(id?: string, name?: string) {
    super(id, name);
    this.seo = new SEOInfo();
    this.pre = new PreambleInfo();
    this.paras =  new Array<ArticlePara>();
  }
}

export class TemplageBlogDetailsData extends BlogDetailsData {
  constructor(id?: string, name?: string) {
    super(id, name);
    this.pre = new PreambleInfo();
    this.paras [0] =  new ArticlePara("1" , "h2");
    //this.paras [0].content ="ssss1ss";
    this.paras [1] =  new ArticlePara("2" , "text");
    this.paras [2] =  new ArticlePara("" , "h2");
    this.paras [3] =  new ArticlePara("" , "text");
  }
}

export class WebpageView  {
  public _id: string;
  public lsid: string;
}
export class BlogWebpageListView extends WebpageView {
  public seo: SEOInfo;
  public pre:PreambleInfo;
  public displayWidgets: DisplaySummeryMe[];

  constructor(id?: string, name?: string) {
    super();
    this.pre = new PreambleInfo();
    this.displayWidgets =  new Array<ArticleContent>();
  }
}
export class BlogWebpageView extends WebpageView {
  public seo: SEOInfo;
  public pre:PreambleInfo;
  public name: string;
  public displayWidgets: DisplayMe[];

  constructor(id?: string, name?: string) {
    super();
    this._id = id;
    this.lsid = id;
    this.name = name;
    this.pre = new PreambleInfo();
    this.displayWidgets =  new Array<ArticleContent>();
  }

  decodeBlog(json: Object): BlogWebpageView {
    let user = Object.create(BlogWebpageView.prototype);
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
  dte: string = "03/17/2024"; //publish date
  aut: AuthorInfo = new AuthorInfo("");
  vi: ViewInfo = new ViewInfo();
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
  u: string = "";
  f: string = "";
  l: string = "";
  i: string = "../assets/img/writer.png";
  constructor(u:string, f?:string, l?: string, i?:string) {
    this.u = u;
    this.f = f;
    this.l = l;
    this.i = i;
  }
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


export const RootObjectType = {
  rootblogstory: "rootsimplestory",
  rootsimplestory: "rootsimplestory",
  rootuser: "rootuser",
  rootcategory : "rootcategory",
  rootpage : "rootpage",
  roottag: "roottag",
  rootforum: "rootforum",
  rootquiz:  "rootquiz",
   rootevent: "rootevent"

}