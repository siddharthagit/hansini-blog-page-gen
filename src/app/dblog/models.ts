/*
export class BlogDetails {
  lsid: string;
  uniqueName: string;
  displayName: string;
  summary: string;
  description: string;
  blogImage: string;
  stars: number;
  views: number;
  public paragraphs: BlogParagraph[];
  updatedDateTime: Date;
  author: Author;
  tags: string[];
  category: string;

  constructor(uniqueName?: string, name?: string, lsid?: string) {
    this.uniqueName = uniqueName || "";
    this.displayName = name|| "";
    this.lsid = lsid|| "";
    this.author = new Author();

    this.summary = "";
    this.description = "";
    this.blogImage ="";
    this.stars = 0;
    this.views =0;
    this.paragraphs = new Array<BlogParagraph>();
    this.updatedDateTime = new Date();
    this.tags = new Array<string>();
    this.category = "";
  }

  decodeObject(json: Object): BlogDetails {
    let user:BlogDetails = new BlogDetails(); //Object.create(CstBlogDetails.prototype);
    Object.assign(user, json, {
    });
    return user;
  }
}
*/
export class Author {
  fullName: string = "";
  icon: string = "";
}
/*
export class BlogParagraph {
  name: string = "";
  order: number;
  msg: string;
  type: string;   //image,video,url,code,text,hidden

  constructor(o: number, t: string, msg: string, ) {
    this.order = o;
    this.type = t;
    this.msg = msg;
  }
}*/


//copy
//import { exists } from "fs";

export const DataSource = {
  LS: "LS",
  FS: "FS"
}


export enum ParagraphType {
  H1,
  H2,
  H3,
  H4,
  IMG,
  IMA,
  VID,
  URL,
  TXT,
  TXS,
  NOE,
  RAD,
  SEL
}

export class KeyValPair {
  key: string;
  val: string;
  constructor(k?:string, v?: any) {
    this.key = k!;
    this.val = v;
  }
}


export class FormStatus {
  key: number;
  msg: string;
  constructor( v?: any) {
    this.key = 0;
    this.msg = v;
  }
}

export class KeyNumValPair {
  key: number;
  val: string;
  constructor(k?:number, v?: any) {
    this.key = k!;
    this.val = v;
  }
}


export const UIFieldType  ={
  IMA: { key: "IMA", desc: "IMG Upload" },
  TXT: { key: "TXT", desc: "Text area" },
  TXS: { key: "TXS", desc: "Single line Text" },
  NOE: { key: "NOE", desc: "Not visible in UI" },
  RAD: { key: "RAD", desc: "Radio" },
  SEL: { key: "SEL", desc: "Select" },
  CHOOSER: { key: "CHOOSER", desc: "Select"},
  DAT: { key: "DAT", desc: "Date"},
}

//public s: number; //delete=-1 0=draft review=1 inactive=10 public=11 public_with_comments =12
export const ObjectStatusMAP  = new Map();
ObjectStatusMAP.set("Default", { key: -2, desc: "All" });

/**
 * All object status possible, -1 is only for UI not stored in server
 */
export const ObjectStatusMap3 = new Map([
  [-1, { key: -1,  desc: "All" }],
  [0, { key: 0,  desc: "Deleted" }],
  [1, { key: 1,  desc: "Draft" }],
  [2, { key: 2,  desc: "Review" }],
  [4, { key: 4,  desc: "Inactive" }],
  [11, { key: 11,  desc: "Public" }],
  [12, { key: 12,  desc: "PublicWithAct" }],
  [13, { key: 13,  desc: "PublicWithComm" }],
  [14, { key: 14,  desc: "PublicWithActComm" }],
]);

export const ObjectStatusMap = new Map([
  [-1, new KeyValPair( "-1", "All")],
  [0, new KeyValPair( "0", "Deleted")],
  [1, new KeyValPair( "1", "Draft")],
  [2, new KeyValPair( "2", "Review")],
  [4, new KeyValPair( "4", "Inactive")],
  [11, new KeyValPair( "11", "Public")],
  [12, new KeyValPair( "12", "PublicWithAct")],
  [13, new KeyValPair( "13", "PublicWithComm")],
  [14, new KeyValPair( "14", "PublicWithActComm")],


]);


export class GridObject {
  public lsid: string;
  public displayName: string;
  public updateDate: Date;
  public status: string;
  public creator: string;
  public dataSource: string;
  constructor(id?: string, name?: string) {
    this.lsid = id!;
    this.displayName = name!;
    this.updateDate = new Date();
    this.status = "";
    this.creator = "";
    this.dataSource = DataSource.LS.toString();
  }
}

export class ChooserOpt {
  isMulti: boolean;
  objectRef:string;
  constructor() {
    this.isMulti = false;
    this.objectRef = "";
  }
}
export class UIParagraphRow {
  row: number ;
  type: string;

  constructor(rowno: number, type: string ){
    this.row = rowno;
    this.type = type;
  }
}

export class UIField {
  public type: string; //FIELD_OBJECTTYPE
  public modelName: string; //Field Model Name
  public value: any;
  public label: string;
  public placeHolder: string;
  public isRequred: boolean;
  public options: Array<KeyNumValPair>;
  editcontext: EditFieldContext = new EditFieldContext();
  public chooserProp: ChooserOpt
  filePreview: string = "";

  constructor(type: string, label?: string, modelName?: string) {
    this.type = type;
    this.label = label!;
    this.modelName = modelName!;
    this.editcontext = new EditFieldContext();
    this.value = "";
    this.placeHolder = "Please enter value for " + label;
    this.isRequred = false;
    this.options = [];
    this.chooserProp = new ChooserOpt;
  }
  setRequired(value:boolean) {
     this.isRequred = value;
     return this;
  }
  addStandardOptions( ) {
    let pair:KeyNumValPair = new KeyNumValPair();
    pair.key = parseInt(ObjectStatusMap.get(4)?.key || "0");
    pair.val = ObjectStatusMap.get(4)?.val ?? "";
    this.options.push(pair);

    let pair2:KeyNumValPair = new KeyNumValPair();
    pair2.key = parseInt(ObjectStatusMap.get(11)?.key || "0");
    pair2.val = ObjectStatusMap.get(11)?.val ?? "";
    this.options.push(pair2);

    return this;
  }
  addSelectOptions(pair: KeyNumValPair) {
    this.options.push(pair);
    return this;
  }
  addChooserProp (ismulti:boolean, objectRef: string) {
    this.chooserProp.isMulti = ismulti;
    this.chooserProp.objectRef  = objectRef;
    return this;
  }
}



class EditFieldContext {
  constructor() {
    this.isEditing = false;
  }
  isEditing: boolean;
  isValid: boolean = true;
  isDirty: boolean = false;
  toggle: boolean = false;
  filePreview:string = "";
  controlToggle:boolean = false;
  key:string = "";
  keyval:string = "";
}


export class CreatorAuthor {
  u: String;
  e: string = "";  //email
  f: string;       //fname
  l: string;       //lname
  p:string;        //photourls

  constructor() {
    this.u = "";
    this.e = "";
    this.p = "";
    this.f = "";
    this.l = "";
  }
}

export class ViewInfo {
  p: Date = new Date(); //publish date
  v: number = 100;      //vno
  c: number = 100;      //cno

  constructor() {
  }
}


export class SEO {
  k: string
  d: string
  editFields: Set<UIField>;
  constructor() {
    this.k = "";
    this.d = "";
    this.editFields = new Set();
    this.editFields.add(new UIField("TXS", "Description", "d"));
    this.editFields.add(new UIField("TXS", "Keyworkds", "k"));
  }

  toStorage():Object  {
    let obj: SEO = new SEO();
    obj['d'] = this.d; //
    obj['k'] = this.k; //
    return obj;
  }
}

export class DNA {
  //public o: string; //object type
  public a: string = ""; //created by
  public y: Date  = new Date();   //create date
  public z: Date = new Date();   //update date
  //will be depreciated
  public s: number = 0; //status public s: number; //delete=-1 0=draft review=1 inactive=10 public=11 public_with_comments =12
  //public v: number = 0; //version
  constructor(a?: string, y?:Date) {
    this.z = new Date();
    this.s = 0;
  }


  toStorage():Object  {
    let obj: DNA = new DNA();
    obj['a'] = this.a; //
    obj['y'] = this.y; //
    obj['z'] = this.z; //
    obj['s'] = this.s; //
    //obj['v'] = this.v; //
    return obj;
  }
}


export class HansiniKeyVal {
  k: string
  v: any
  constructor(k:string, v:string) {
    this.k = k;
    this.v = v;
  }
}

export class CreatableStoreObject {

}


export interface IChild {
  id: string;
  label: string;
  type: object;
  max: number;
}

export class ObjectChild implements IChild {
  id: string = ""
  label: string = "";
  type: object = {};
  max: number= 5 ;
  constructor(id:string, label:string, type:any) {
    this.id = id;
    this.label = label;
    this.type = type;
  }
}

interface ParagraphMeta {


}

class ParagraphMetaBlog implements ParagraphMeta {
  codeLang: string = "";
  desc : string = "";
  liveurl: string = "";
  d : string = "";
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

  export class SearchKey {
    public text: string = "";
    public status: number = -1;
    public catID:string = ""
  }
function addStatusField(): UIField {
  return new UIField("SEL", "Active", "z").addStandardOptions();
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