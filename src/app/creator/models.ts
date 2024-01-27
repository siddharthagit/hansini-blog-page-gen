import { ThisReceiver } from "@angular/compiler";
import { Timestamp } from "rxjs";

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

export class CreatableObject {
  public _id: string;
  public lsid: string;
  public _rev: string;
  public uuid: string;
  public remoteid: string;
  public name: string;
  public fullfetch: boolean;

  public updatedDateTime: Date;
  public syncDateTime: Date;
  public paragraphs: BlogParagraph[];
  public dna: DNA;
  public status: number;
  public category: String;

  constructor(id?: string, name?: string ) {
    this._id = id;
    this.lsid = id;
    this.name = name;
    }


}

export class BlogDetails extends CreatableObject {
  public summary: string;
  public description: string;
  public mainImage: string;

  constructor(id?: string, name?: string, category?: string) {
    super();
    this._id = id;
    this.lsid = id;
    this.name = name;
    this.category = category;
    this.fullfetch = true;
this.paragraphs = [];
    this.dna = new DNA("rootblogstory");
  }

  decodeBlog(json: Object): BlogDetails {
    let user = Object.create(BlogDetails.prototype);
    return Object.assign(user, json, {
    });
  }
}


export class DNA {
  public objectType: string;
  public objectVersion: string;
  constructor(id?: string) {
    this.objectType = id;
  }
}

export class BlogParagraph {
  heading: string;
  content: string;
  type: string;
  order: number;
  meta: object;
  constructor(h?: string, c?: string, t?: string, o?: number) {
    this.heading = h;
    this.content = c;
    this.type = t;
    this.order = o;
    this.meta = {};
  }
}

export class KeyValPair {
  key: string;
  val: string;
  constructor(k: string, v: any) {
    this.key = k;
    this.val = v;
  }
}


//////////////////
