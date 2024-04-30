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
  public _id: string = "0";
  public lsid: string = "0";
  public _rev: string;
  public ud: Date;
  public created: Date;
  public status: number;
  
  constructor(id?: string, name?: string ) {
    this._id = id;
    this.lsid = id;
    this.ud= new Date();
    this.created = new Date();
    this.status = 1;
   
  }
}

export class RootCreatableObject extends CreatableObject {

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
export class CreatorAuthorObject extends RootCreatableObject {
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
  public paras: DisplayMe[];

  constructor(id?: string, name?: string) {
    super();
    this._id = id;
    this.lsid = id;
    this.name = name;
    this.pre = new PreambleInfo();
    this.paras =  new Array<ArticleContent>();
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

export class FormStatus {
  key: number;
  msg: string;
  constructor( v?: any) {
    this.key = 0;
    this.msg = v;
  }
}

export class FileUpload {
  key: string = "";
  name: string = "";;
  url: string = "";
  file: File | null;

  constructor(file: File | null) {
    this.file = file;
  }

}


export class FileUpload2 {
  name: string = "";;
  url: string = "";
  constructor() {
  }

}

//Related to timeline

export class TimelineEntry {
  public date: string;
  public title: string;
  public desc: string;
  public url : string;
  constructor(d:string, t:string, de:string, u:string) {
    this.date = d;
    this.title = t;
    this.desc = de;
    this.url = u;
  }
}

export class TimelineData extends RootCreatableObject {
  public seo: SEOInfo;
  public name: string;
  public sum: string;
  public pre:PreambleInfo;
  public paras: TimelineEntry[];
  public style:number = 1; // 1=ho, 2=vertical left 3=vertical alternate

  constructor(id?: string, name?: string) {
    super(id, name);
    this.seo = new SEOInfo();
    this.pre = new PreambleInfo();
    this.paras =  new Array<TimelineEntry>();
    this.paras [0] = new TimelineEntry("","","","");
  }
}


export class SiteConfig {
  name: string = ""; //name
  summary: string = ""; //summary
  copyright: string = ""; //copyright
  description: string = ""; //Description
  email: string = "";
  eventDescription: string = ""
  quizDescription: string = ""

  constructor () {
  }
}