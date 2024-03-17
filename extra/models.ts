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

/** Creatable objects by Hansini editor */
export class CreatableObject {
  public lsid: string;
  public u : string;      //underscore unique url name :: generated from displayName
  public m: object;       //contains custom attributes that are not saved in database

  //editcontext: EditFieldContext = new EditFieldContext();

  /**Fields that a editor can populate, these fields are stored in database **/
  public editFields: Set<UIField>;
  // Fields that a admin or editor can populate, these fields are stored in database
  // Like SEO, State* They will be updated in a different technique.

  childrens:IChild [] = [];

  childrenMap: Map<string, IChild> = new Map();

  constructor(id?: string, name?: string) {
    this.lsid = id!;
    //this.m = { liveurl: '', generageTOI: true, uniqueNameGenerated:false,  };
    this.m = {};
    this.editFields = new Set();
    this.u ='';
    //this.d = new DNA();
  }

  toStorage1():Object  {
    console.log("Models CreatableObject: toStorage()");
    let obj: CreatableObject = new CreatableObject ();
    //obj['lsid'] = this.lsid;
    obj['u'] = this.u!; //uniqueName
    //obj['s'] = this.s; //state
    //obj['d'] = this.d!; //dna
    obj["lsid"] = this.lsid!; //dna
    this.editFields.forEach((value: UIField) => {
      console.log(" toStorage()....."+value.modelName, value);
      //
      (obj as any).s = value.value;
    });
    return obj;
  }
  toStorage():Object  {
    console.log("Models CreatableObject: toStorage()" + JSON.stringify(this));
    //let dest: CreatableStoreObject = new CreatableStoreObject ();
    let dest: any = new CreatableStoreObject ();
    dest["ud"] = {};
    //(dest as any)["hd"] = (this as any).hd;
    //(dest as any)["ud"] = (this as any).ud;
    //(dest as any)["u"] = this.u;
    //(dest as any)["lsid"] = this.lsid;
    this.editFields.forEach((value: UIField) => {
      let fn = value.modelName;
      console.log(" toStorage()....." + value.modelName, value);
      dest["ud"][fn] = value.value;
    });
    console.log(" toStorage()....." + JSON.stringify(dest));
    this.populateUniqueID(dest);
    return dest;
  }
  public populateUniqueID(ret: any) {
    if (this.u == "" || this.u == undefined) {
      this.u = (ret as any)["ud"]["n"].replace(/ /g, "_");
    }
    (ret as any)["u"] = this.u;
  }

}


export class BlogParagraph {
  //h: string; //title
  c: any; // content
  t: string; // type HTML Type like H2, H3, TXT, IMG, VID etc
  o: number; // order
  //m: ParagraphMetaBlog;
  editcontext: EditFieldContext;
  constructor(c?: string, t?: string, o?: number) {
    //this.h = h!;
    this.c = c!;
    this.t = t!;
    this.o = o!;
    //this.m = new ParagraphMetaBlog();
    this.editcontext = new EditFieldContext();
  }

  decodeObject(json: Object): BlogParagraph {
    let user = Object.create(BlogParagraph.prototype);
    return Object.assign(user, json, {
    });
  }

  toStorage():CreatableStoreObject {
    let o:CreatableStoreObject = new CreatableStoreObject();
    (o as any).c = this["c"];
    (o as any).t = this["t"];
    (o as any).o = this["o"];
    //(o as any).m = this["m"];
    return o
  }
}


/**
 * Base object for Blog
 */
export class UserData {
  n: string = ""; //name
  s: string = ""; //summary
  c: KeyValPair = new KeyValPair(); //Category
  b: string = ""; //Description
  i: any = ""; //Image
  p: BlogParagraph[];

  constructor () {
    this.p = new Array<BlogParagraph>();
  }
  toStorage():any {
      let ret:any = {};
      ret["n"] = this.n;
      ret["s"] = this.s;
      ret["c"] = this.c;
      ret["b"] = this.b;
      ret["i"] = this.i;

      ret["p"] = [];
      console.log("sidd2 + " + JSON.stringify(this.p));

      this.p.forEach(i=> {
        ret["p"].push(i.toStorage());
        console.log("sidd + " + JSON.stringify(i));
      })

      return ret;
  }
}

export class ToStorage {

  BlogParagraphStorage(data:BlogParagraph) {
    let o1:any = {};
    (o1 as any).c = data["c"];
    (o1 as any).t = data["t"];
    (o1 as any).o = data["o"];
    //(o as any).m = data["m"];
    return o1
  }

  UserDataToStorage(data: UserData) {
    let ret:any = {};
      ret["n"] = data.n;
      ret["s"] = data.s;
      ret["c"] = data.c;
      ret["b"] = data.b;
      ret["i"] = data.i;

      ret["p"] = [];
      console.log("sidd2 + " + JSON.stringify(data.p));

      data.p.forEach(i=> {
        ret["p"].push(this.BlogParagraphStorage(i));
        console.log("sidd + " + JSON.stringify(i));
      })
      return ret;
  }
}

export class HansiniData {
  a: CreatorAuthor = new CreatorAuthor();
  b: string = "";                     //Author ref
  i: ViewInfo = new ViewInfo();
  d: DNA = new DNA();
  g:SEO = new SEO();
  u:string = "";
}
/*
export class CreatableBlogObject extends CreatableObject {
  ud: UserData = new UserData() ;
  hd: HansiniData = new HansiniData();

  constructor(id?: string, name?: string, category?: string) {
    super(id,name);
    this.editFields.add(new UIField(UIFieldType.TXS.key, "Name", "n").setRequired(true));
    this.editFields.add(new UIField(UIFieldType.TXT.key, "Summary", "s").setRequired(true));
    this.editFields.add(new UIField(UIFieldType.TXT.key, "Description", "b"));
    this.editFields.add(new UIField(UIFieldType.IMA.key, "Image Upload", "i"));
    this.editFields.add(new UIField(UIFieldType.CHOOSER.key, "Category", "c").addChooserProp(false,"rootcategory"));
    this.editFields.add(addStatusField());

    //let obj = { id: "p", label: "questions", type:EventLine, max:5};
    let obj = new ObjectChild("p", "Paragraphs", EventLine);
    this.childrenMap.set("p", obj);
    this.childrens.push(obj);
  }

 
  decodeObject(json1: Object): CreatableBlogObject {
    //console.log("CreatableBlogObject decode :: json : " + JSON.stringify(json));
    let user:CreatableBlogObject = new CreatableBlogObject();
    //copy all the properties
    Object.assign(user, json1, {
    });
   

    let json = (json1 as any)["ud"];
    for (let key of Object.keys(json)) {
      let v = json[key as keyof Object];
      for(let field of user.editFields.values()){
       // console.log("CreatableBlogObject field = " + field.modelName + "  " + key.toString());
        field["editcontext"] = new EditFieldContext()
        if (field.modelName == key) {
          field.value = v;
        }
      }
    }

    user.ud.p.forEach( a => {
          a.editcontext = new EditFieldContext();
    } )
   
    console.log("CreatableBlogObject decode :: user : " + JSON.stringify(user));
    return user;

  }

  override toStorage():CreatableStoreObject {
    console.log("CreatableBlogObject:: toStorage : " + JSON.stringify(this));
    let dest:any  = new CreatableStoreObject();
    (dest as any)["hd"] = this.hd;
    let newud:UserData = this.ud;
    (dest as any)["ud"] = new ToStorage().UserDataToStorage(this.ud);
    (dest as any)["u"] = this.u;
    (dest as any)["lsid"] = this.lsid;
    dest["hd"]["b"]= ""; 
    this.populateUniqueID(dest);
    return dest;
  }
*/
  /**
    {
      hd : {} -> author, viewinfo, d
      ud: {}  -> edit fields
      s: {} seo
    }

  */
 /*
  override toStorage():CreatableStoreObject {
    console.log("Models CreatableObject: toStorage()");
    let hd: CreatableStoreObject = new CreatableStoreObject ();
    //obj['lsid'] = this.lsid;
    //(hd as any)['u'] = this.u!; //uniqueName
    (hd as any)["d"] = this.d!; //dna
    //(hd as any)["lsid"] = this.lsid!; //dna
    (hd as any)["a"] = new CreatorAuthor(); //dna
    (hd as any)["i"] = new ViewInfo(); //dna
    let ud: CreatableStoreObject = new CreatableStoreObject ();
    this.editFields.forEach((value: UIField) => {
      let fn = value.modelName;
      console.log(" toStorage()....." + value.modelName, value);
      (ud as any)[fn] = value.value;
    });
    let ret: CreatableStoreObject = new CreatableStoreObject ();
    (ret as any).hd = hd;
    (ret as any).ud = ud;
    (ret as any)["s"] = {};

    console.log("Models CreatableObject: toStorage OP = " + JSON.stringify(ret));
    return ret;
  }
  
}
*/

export class CstUserObject extends CreatableObject {

  constructor() {
    super();
    //this.editFields = new Map();
    //this.fields = ["displayName", "photoURL", "email", "uid"];
    this.editFields.add(new UIField("TXS", "First Name", "c"));
    this.editFields.add(new UIField("TXS", "First Name", "d"));
    this.editFields.add(new UIField("IMA", "Profile Picture", "i"));
    this.editFields.add(new UIField("TXS", "Email", "e"));
    this.editFields.add(new UIField("SEL", "Active", "a")
    .addStandardOptions());
    //this.d = new DNA();
    this.editFields.add(new UIField("NOE", "", "uid"));
  }

  /*
  decodeBlog(json: Object): CreatableStaticObject {
    let user = Object.create(CreatableBlogObject.prototype);
    return Object.assign(user, json, {
    });
  }
  */
  decodeObject(json1: Object): CstUserObject {
    console.log("CreatableStaticObject:: decodeBlog" + JSON.stringify(json1));
    let user: CstUserObject = new CstUserObject();//Object.create(CreatableStaticObject.prototype);
    let json = (json1 as any)["ud"];
    for (let key of Object.keys(json)) {
      console.log("CreatableStaticObject:: key : " + key);
      let v = json[key as keyof Object];
      for(let item of user.editFields.values()){
        if (item.modelName == key) {
          item.value = v.toString();
        }
      }

    }
    return user;
  }

  override toStorage():Object {
      console.log("Models CstUserObject: toStorage()");
      let dest: any = new CreatableStoreObject ();
      dest["ud"] = {};
      this.editFields.forEach((value: UIField) => {
        let fn = value.modelName;
        console.log(" toStorage()....." + value.modelName, value);
        dest["ud"][fn] = value.value;
      });
     
      dest['u'] = dest["ud"]['e'];
      //if no status selected set inactive
      if(dest["ud"]['a'] =='') dest["ud"]['a'] = 4;
      console.log(" toStorage()....." + JSON.stringify(dest));
      return dest;
  }
}

export class HansiniCategoryData {
  d: DNA = new DNA();
}
export class CstCategoryObject extends CreatableObject {
  hd: HansiniCategoryData = new HansiniCategoryData();
  constructor() {
    super();
    this.editFields.add(new UIField("TXS", "Name", "n").setRequired(true));
    //this.editFields.add(new UIField("IMA", "Profile Picture", "m").setRequired(true));
    this.editFields.add(new UIField("TXT", "Description", "d").setRequired(true));
    this.editFields.add(addStatusField());
  }

  decodeObject(json1: Object): CstCategoryObject {
    let user: CstCategoryObject = new CstCategoryObject();
    let json = (json1 as any)["ud"];
    for (let key of Object.keys(json)) {
      //console.log("CreatableStaticObject:: key : " + key);
      let v = json[key as keyof Object];
      for(let item of user.editFields.values()){
        if (item.modelName == key) {
          item.value = v.toString();
        }
     }
    }
    user.u = (json1 as any)["u"];
    return user;
  }

  override toStorage():CreatableStoreObject {
    let ret: CreatableStoreObject = new CreatableStoreObject();
    console.log("Models CstCategoryObject: toStorage()" + JSON.stringify(this));
    let ud: Object = { };
    this.editFields.forEach((field: UIField) => {
      //console.log(" toStorage()....." + JSON.stringify(field));
      let mname = field.modelName;
      //obj[field.modelName] = field.value;
      (ud as any)[mname] = field.value;
    });
    (ret as any)["ud"] = ud;
    (ret as any)["hd"] = this.hd;

    this.populateUniqueID(ret);

    return ret;

   //return super.toStorage();
  }


}

export class CstPageObject extends CreatableObject {
  constructor() {
    super();
    //this.fields = ["displayName", "photoURL", "email", "uid"];
    this.editFields.add(new UIField("TXS", "Page Name", "pageName"));
    this.editFields.add(new UIField("TXT", "Description", "desc"));
    this.editFields.add(new UIField("IMA", "Profile Picture", "mainImage"));
    this.editFields.add(new UIField("SEL", "Active", "status").addSelectOptions(new KeyNumValPair(1, "Yes")).addSelectOptions(new KeyNumValPair(2, "No")));
    this.editFields.add(new UIField("NOE", "Unique Name", "uniqueId").addStandardOptions());

    //this.d = new DNA();
  }
  decodeObject(json: Object): CstPageObject {
    //console.log("CreatableStaticObject:: decodeBlog");
    let user: CstPageObject = new CstPageObject();//Object.create(CreatableStaticObject.prototype);
    for (let key of Object.keys(json)) {
      console.log("CreatableStaticObject:: key : " + key);
      let v = json[key as keyof Object];
      for(let item of user.editFields.values()){
        if (item.modelName == key) {
          item.value = v.toString();
        }
     }

    }
    return user;
  }

  override toStorage():object {
    return super.toStorage();
   }
}

export class CstTagObject extends CreatableObject {
  constructor() {
    super();
    //this.fields = ["displayName", "photoURL", "email", "uid"];
    this.editFields.add(new UIField("TXS", "Display Name", "d"));
    this.editFields.add(new UIField("NOE", "Unique Name", "u"));
    //this.d = new DNA();
  }

  decodeObject(json: Object): CstTagObject {
    //console.log("CreatableStaticObject:: decodeBlog");
    let user: CstTagObject = new CstTagObject();//Object.create(CreatableStaticObject.prototype);
    for (let key of Object.keys(json)) {
      console.log("CstTagObject:: key : " + key);
      let v = json[key as keyof Object];
      for(let item of user.editFields.values()){
         if (item.modelName == key) {
           item.value = v.toString();
         }
      }
    }
    return user;
  }

  override toStorage() {
    return super.toStorage();
  }
}

export class EventLine {
  n: string = "";
  s: string = "";
  e: string = "";
  public editFields: Array<UIField> = new Array();
  constructor() {
    //super();
    this.editFields.push(new UIField("TXS", "Display Name", "n"));
    this.editFields.push(new UIField("TXS", "Start Date", "s"));
    this.editFields.push(new UIField("TXS", "End Date", "e"));
  }

  decodeObject(json: Object): EventLine {
     console.log("Model EventLine:: start" + JSON.stringify(json));
     let user: EventLine = new EventLine();
     for (let key of Object.keys(json)) {
        let obj = json[key as keyof Object];
        console.log("Model EventLine:: v : " + JSON.stringify(obj));
        for(let item of user.editFields.values()){
          if (item.modelName == key) {
            item.value = json[key as keyof Object].toString();
          }
        }
      }
    return user;
  }
}

export class UserEventData {
  n: string = ""; //name
  s: string = ""; //start date //milliseconds
  e: string = ""; //end date
  c: KeyValPair = new KeyValPair(); //Category
  b: string = ""; //Description
  p: EventLine[] = [];

  constructor () {
    this.p = new Array<EventLine>();
  }
}


export class CstEventObject extends CreatableObject {
  ud: UserEventData = new UserEventData() ;
  hd: HansiniData = new HansiniData();
  constructor() {
    super();
    //this.fields = ["displayName", "photoURL", "email", "uid"];
    this.editFields.add(new UIField("TXT", "Display Name", "n"));
    this.editFields.add(new UIField("TXS", "Unique Name", "u"));
    this.editFields.add(new UIField("TXS", "Start Date", "s"));
    this.editFields.add(new UIField("TXS", "End Date", "e").addStandardOptions());
    //this.p = new Array<EventLine>();
    let obj = { id: "p", label: "Events", type:EventLine, max:15};
    this.childrens.push(obj);
  }

  decodeObject (json1:Object) {
     console.log("CstEventObject decode source:: json : " + JSON.stringify(json1));
     let user:CstEventObject = new CstEventObject();
     //copy all the properties
     Object.assign(user, json1, {
     });
     /**/

     let json = (json1 as any)["ud"];
     for (let key of Object.keys(json)) {
       let v = json[key as keyof Object];
       for(let field of user.editFields.values()){
        // console.log("CreatableBlogObject field = " + field.modelName + "  " + key.toString());
         field["editcontext"] = new EditFieldContext()
         if (field.modelName == key) {
           field.value = v.toString();
         }
       }
     }


     /**/
     console.log("CstEventObject decode dest :: user : " + JSON.stringify(user));
     return user;
  }


  override toStorage():CreatableStoreObject {
    console.log("CstEventObject:: toStorage : this= " + JSON.stringify(this));
    let dest:CreatableStoreObject  = new CreatableStoreObject();
    (dest as any )["hd"] = {};
    (dest as any )["ud"] = {};
    this.editFields.forEach((field: UIField) => {
      let fn = field.modelName;
      //console.log(" toStorage()....." + field.modelName, field);
      (dest as any)["ud"][fn] = field.value;
    });
    this.populateUniqueID(dest);
    return dest;
  }

}



//////////// QUIZ ///////////

export class QuestionLine {
  public editFields: Array<UIField> = new Array();
  constructor() {
    this.editFields.push(new UIField("TXS", "Question", "n"));
    this.editFields.push(new UIField("TXS", "Option A", "a"));
    this.editFields.push(new UIField("TXS", "Option B", "b"));
    this.editFields.push(new UIField("TXS", "Option C", "c"));
    this.editFields.push(new UIField("TXS", "Option D", "d"));
    this.editFields.push(new UIField("SEL", "Correct", "x")
    .addSelectOptions(new KeyNumValPair(1, "a")).addSelectOptions(new KeyNumValPair(2, "b"))
    .addSelectOptions(new KeyNumValPair(3, "c")).addSelectOptions(new KeyNumValPair(4, "d")));
  }
/*
  decodeObject(json: Object): QuestionLine {
     console.log("Model QuestionLine:: start" + JSON.stringify(json));
     let user: QuestionLine = new QuestionLine();
     for (let key of Object.keys(json)) {
        let obj = json[key as keyof Object];
        console.log("Model QuestionLine:: key, obj =  : "+ key + " _" + JSON.stringify(obj));
        for(let field of user.editFields.values()){

            if (field.modelName == "a" ||field.modelName == "b" || field.modelName == "c" || field.modelName == "d") {
              //let o = json["o"];
              let o = (json as any).o;
              for (let key of Object.keys(o)) {
              let oo = o[key];

              console.log("Model QuestionLine abcd::" + JSON.stringify(oo[field.modelName]));
              if (oo[field.modelName] != undefined && oo[field.modelName] != "")
              field.value = oo[field.modelName];
            }
          }

          else if (field.modelName == key) {
              //field.value = json[key];
              field.value = (json as any).key;
          }
        }
      }
    return user;
  }

  toStorage() {
    console.log("Models QuestionLine: toStorage()" + JSON.stringify(this));
    let obj: Object = { };
    this.editFields.forEach((field: UIField) => {
      console.log(" toStorage()....." + JSON.stringify(field));
      let fname = field.modelName;
      //obj[field.modelName] = field.value;
      (obj as any)[fname] = field.value;
    });


    return obj;
  }*/
}
export class UserQuizData {
  /*n: string = ""; //name
  s: string = ""; //start date //milliseconds
  e: string = ""; //end date
  c: KeyValPair = new KeyValPair(); //Category
  b: string = ""; //Description */
  p: QuestionLine[] = [];

  constructor () {
    this.p = new Array<QuestionLine>();
  }
}
export class CstQuizObject extends CreatableObject {
  ud: UserQuizData = new UserQuizData() ;
  hd: HansiniData = new HansiniData();
  opt = {editFields: new Set<UIField>() }
  options = [{editFields: new Set<UIField>() }]
  //n: string = "";
  //s: string = "";

  constructor() {
    super();
    this.editFields.add(new UIField("TXT", "Display Name", "n"));
    this.editFields.add(new UIField("TXT", "Summary", "s"));
    let obj = { id: "p", label: "questions", type: QuestionLine, max:5};
    this.childrens.push(obj);
   }

   decodeObject (json1:any) {
    console.log("CstQuizObject decode :: json : " + JSON.stringify(json1));
    let user:CstQuizObject = new CstQuizObject();
    //copy all the properties

    /**/

    let json = (json1 as any)["ud"];
    for (let key of Object.keys(json)) {
      let v = json[key as keyof Object];
      if (key != "p") {
        for(let field of user.editFields.values()){
          // console.log("CreatableBlogObject field = " + field.modelName + "  " + key.toString());
          field["editcontext"] = new EditFieldContext()
          if (field.modelName == key) {
            field.value = v.toString();
          }
        }
      }
      else {
        json["p"].forEach( (a:any)  => {
          if (Object.keys(a).length === 0) {
            console.log("asidd" + JSON.stringify(a));
          }
          else {
          console.log("sidd" + JSON.stringify(a));
          let line:QuestionLine = new QuestionLine();
          for (let ckey of Object.keys(a)) {
            let cv = a[ckey as keyof Object];
            for(let field of line.editFields.values()){
              if (field.modelName == ckey) {
                field.value = cv.toString();
              }
            }
          }

          user.ud.p.push(line)
        }
        });
      }
    }

    console.log("CstQuizObject decode :: user : " + JSON.stringify(user));
    return user;
 }

 override toStorage():CreatableStoreObject {
  console.log("CstQuizObject:: toStorage : src = " + JSON.stringify(this));
  let dest:CreatableStoreObject  = new CreatableStoreObject();
  //delete (dest as any ).ud.p;
  (dest as any )["hd"] = {};
  (dest as any )["ud"] = {};
  this.editFields.forEach((field: UIField) => {
    let fn = field.modelName;
    //console.log(" toStorage()....." + field.modelName, field);
    (dest as any)["ud"][fn] = field.value;
  });

  this.populateUniqueID(dest);
  let newp:any = [];
  this.ud.p.forEach((field: QuestionLine) => {
    //delete (field as any).editFields;
    let newe: any = {};
    field.editFields.forEach((f: UIField) => {
      let fn = f.modelName;
      //console.log(" toStorage()....." + field.modelName, field);
      newe[fn] = f.value;
    });
    newp.push(newe);
  });

  (dest as any)["ud"]["p"] = newp;

  console.log("CstQuizObject:: toStorage : dest = " + JSON.stringify(dest));
  return dest;
}
  /**/
 /*
  override toStorage():CreatableStoreObject {
    console.log("CstQuizObject:: toStorage : ");
    let dest:CreatableStoreObject  = new CreatableStoreObject();
    Object.assign(dest, this, {
    });

    try {
    delete (dest as any).editFields;
    delete (dest as any).childrens;
    delete (dest as any).childrenMap;
    (dest as any ).p.forEach((para: any) => {
       // delete para.editFields;
       console.log(para);
    })
    }
    catch {
      console.log("CstQuizObject:: toStorage : ");
    }
    console.log("CstQuizObject:: toStorage2 : " + JSON.stringify(dest));
    return dest;
  }
  */
}



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

export  const RootObjectTypeMap = new Map([
  ["rootblogstory", { key: "rootblogstory",store:"", name: "Blog Story" , obj: CreatableBlogObject }],
  ["rootuser", { key: "rootuser", name: "User" , obj: CstUserObject }],
  ["rootcategory", { key: "rootcategory", name: "Category" , obj: CstCategoryObject }],
  ["rootpage", { key: "rootpage", name: "Page" , obj: CstPageObject }],
  ["roottag", { key: "roottag", name: "Tag" , obj: CstTagObject }],
  ["rootforum", { key: "rootforum", name: "Forum" , obj: CstTagObject }],
  ["rootquiz", { key: "rootquiz", name: "Quiz" , obj: CstQuizObject }],
  ["rootevent", { key: "rootevent", name: "Event" , obj: CstEventObject }]
]);

/**
 *
 * rootblogstory: { key: "rootblogstory", name: "Add Blog Story" , obj: CstBlogDetails },
  rootsimplestory: { key: "rootsimplestory", name: "AddSimple Story" , obj: CstBlogDetails},
  rootuser: { key: "rootuser", name: "Add User" ,obj: CstUserObject},
  rootcategory: { key: "rootcategory", name: "Add Category",obj: CstCategoryObject },
  rootpage: { key: "rootpage", name: "Add Page",obj: CstPageObject },
  roottag: { key: "roottag", name: "Add Tag" ,obj: CstTagObject},
  rootforum: { key: "rootforum", name: "Add Forum" ,obj: CstTagObject},
  rootquiz: { key: "rootquiz", name: "Add Quiz", obj: CstTagObject },
  rootevent: { key: "rootquiz", name: "Add Event",obj: CstEventObject }
 */



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