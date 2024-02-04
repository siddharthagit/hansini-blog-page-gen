export class PopOverAct {
    line:number;
    act: string;

    constructor (line:number, action:string) {
        this.line = line;
        this.act = action;
    }
     
  } 

  export class EditorGridObject {
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

  
export class ArticleImageFile {
    name : string
    url: string
    type:string
  }
  export interface LineContent  {}
  
  export class TextContent implements LineContent  {
    data:string;
    constructor (d?:string){
      this.data = d;
    }
     
  }
  
  export class H1Content implements LineContent  {
    data:string;
    constructor (d?:string){
      this.data = d;
    }
  }
  
  export class H2Content implements LineContent  {
    data:string;
    constructor (d?:string){
      this.data = d;
    }
  
  }
  
  export class ListContent implements LineContent  {
    listType: string = "ol";
    li: string[] = [];
    constructor() {
      this.li.push("");
      //this.li.push("item 2");
    }
  }
  
  export class UrlContent implements LineContent  {
  
  }
  
  export class CodeContent implements LineContent  {
    title: string = "code for you!"
    lang: string = "Auto";
    data:string
  }

  export class GitContent implements LineContent  {
    title: string = "code for you!"
    url: string = "Auto";
  }
  
  export class QouteContent implements LineContent  {
    data:string
  }
  
  export class SectionContent implements LineContent  {
   
  }
  
  
  
  export class ImageContent implements LineContent  {
    file:ArticleImageFile = new ArticleImageFile();
    caption:string;
    constructor (n?:string, u?:string, cap?:string){
      this.file.name = n;
      this.file.url = u;
      this.caption = cap;
    }
  }
  
  export class VideoContent implements LineContent  {
    url:string = "";
    caption:string;
    constructor (n?:string,  cap?:string){
      this.url = n;
      this.caption = cap;
    }
  }
  
  export class ParaType {
    TEXT = "text";
    H1 = "h1";
    H2 = "h2";
    IMAGE = "image";
    LIST = "list";
    CODE = "code";
    QOUTE = "qoute";
    SEC = "sec";
    VIDEO = "video";
    GIT = "git";
  }
  export class ArticlePara {
    id: string;
    order:number;
    type:string;      // text, image, video, url,  h1,h2, code, qoute
    content: LineContent;
    constructor (id:string, type:string) {
       this.id = id;
       this.type = type;
       if (type=="text") {
         this.content = new TextContent();
       }
       else if (type=="h1") {
        this.content = new H1Content();
      }
      else if (type=="h2") {
        this.content = new H2Content();
      }
      else if (type=="image") {
        this.content = new ImageContent();
      }
      else if (type=="list") {
        this.content = new ListContent();
      }
      else if (type=="code") {
        this.content = new CodeContent();
      }
      else if (type=="qoute") {
        this.content= new QouteContent();
      }
      else if (type=="sec") {
        this.content= new SectionContent();
      }
      else if (type=="video") {
        this.content= new VideoContent();
      }
    }
    gettitle() {

    }
  }
  
  export class ArticleContent implements EditorMe, DisplayFragmentMe {
    id: string;
    time: string;
    para: Array<ArticlePara> = [];
  }

  /* can display this object in webpage front end */
  export interface DisplayFragmentMe  {}
  /* can Edit in Editor this object  */
  export interface EditorMe  {}
  /* can Edit in Editor this object  */
  //export interface  DisplayFragmentMe {}

  /**
   * Content -> Different Contents
   * DisplayFragmentMe -> 
   * WebpageData->Full page
   * BlogWebpageData -> Full page web page
   * CreatableObject-> Objects that can be savedin db
   * 
   */
  