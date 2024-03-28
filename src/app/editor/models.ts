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
    name : string = ""; //file name
    url: string = "";
    type:string = "";
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

  export class H3Content implements LineContent  {
    data:string;
    constructor (d?:string){
      this.data = d;
    }
  }
  
  export class ListContent implements LineContent  {
    title: string;
    listType: string = "ol";
    raw: string = "";
    li: string[] = [];
    
  }
  
  export class UrlContent implements LineContent  {
    title: string = "url for you!"
    url: string = "http://jsonedit.com";
    data: string = "http://jsonedit.com";
  }
  
  export class CodeContent implements LineContent  {
    title: string = "code for you!"
    lang: string = "Auto";
    data:string
  }

  export class GitContent implements LineContent  {
    title: string = "code for you!"
    data: string = "code for you!"
    url: string = "Auto";
  }
  
  export class QouteContent implements LineContent  {
    data:string = "";
  }
  
  export class SectionContent implements LineContent  {
   
  }

  export class ShortCodeContent implements LineContent  {
    title: string = "Code Title!"
    desc:string ="Code Descripiton!"
    data:string ="Code Sample!"
  }

  export class ConsoleContent implements LineContent  {
    title: string = "console title!"
    data:string ="console output!"
  }
  
  export class ImageContent implements LineContent  {
    //file:ArticleImageFile = new ArticleImageFile();
    name: string = "";
    url: string = "x"; //optional todo remove it
    caption:string = ""; // comes from db
    constructor (n?:string, u?:string, cap?:string){
      this.name = n;
      this.url = u;
      this.caption = cap;
    }
  }
  
  export class VideoContent implements LineContent  {
    title:string;
    url:string = "";
    constructor (n?:string,  cap?:string){
      this.url = n;
      this.title = cap;
    }
  }
  
  export class ParaType {
    TEXT = "text";
    H1 = "h1";
    H2 = "h2";
    H3 = "h3";
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
       
      if (type=="h1") {
        this.content = new H1Content();
      }
      else if (type=="h2") {
        this.content = new H2Content();
      }
      else if (type=="h3") {
        this.content = new H3Content();
      }
      if (type=="txt") {
        this.content = new TextContent();
      }
      else if (type=="img") {
        console.log("add img");
        this.content = new ImageContent();
      }
      else if (type=="vid") {
        this.content= new VideoContent();
      }
      else if (type=="url") {
        this.content= new UrlContent();
      }
      else if (type=="lis") {
        this.content = new ListContent();
      }
      else if (type=="qou") {
        this.content = new QouteContent();
      }
      else if (type=="sec") {
        this.content= new SectionContent();
      }
      else if (type=="cod") {
        this.content = new CodeContent();
      }
      else if (type=="ssc") {
        this.content= new ShortCodeContent();
      }
      else if (type=="con") {
        this.content= new ConsoleContent();
      }
      else if (type=="git") {
        this.content= new GitContent();
      }
     
    }
    gettitle() {

    }
  }
  
  export class ArticleContent implements EditorMe, DisplayMe {
    id: string;
    time: string;
    para: Array<ArticlePara> = [];
  }

  /* can display this object in webpage front end */
  export interface DisplayMe  {}

  export interface DisplaySummeryMe  {}
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
  
  export class KeyValPair {
    key: string;
    val: string;
    constructor(k?:string, v?: any) {
      this.key = k!;
      this.val = v;
    }
  }
  export class CategoryInfo{
    cats: Array<KeyValPair> = [];
  } 
/*
  export class ImageContentData {
    fname : string = ""; //file name
    cap: string = ""; //caption
  }
  */