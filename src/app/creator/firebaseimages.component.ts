import { Component } from '@angular/core';
import { ArticleImageFile, ImageContent } from '../editor/models';
import { CreatorBaseComponent } from './creatorbase.comp';

@Component({
  selector: 'blog-image-list',
  templateUrl: './firebaseimages.component.html',
  styleUrls: ['./creator.css']
})
export class FirebaseImageBrowserComponent extends CreatorBaseComponent {
  
  fbImages:ImageContent[] = [];
  newfbcaption: string = "";
  newupload:boolean = false;
  newlocalfile:any = null;
  newfbfile :ArticleImageFile = new ArticleImageFile();
 

  override ngOnInit() {
    this.fbImages = this.uploadS.listImages("hansini-blogfiles");
  }

  sanitize(val) {
    if (!val) return "";
    //console.log("sanitize " + JSON.stringify(val));
    if (val != null) {
      return this.sanitizer.bypassSecurityTrustUrl(val);
    }
    else return "";
  }

  
  startUpload(event:any) {
    console.log("startUpload Step1 started");
    this.newupload = true;
    this.newlocalfile = event;
    this.uploadS.onFileChangedUIStep1(event).then(
      (data) => {
       console.log("startUpload  Step1 finished");
       //console.log(JSON.stringify(data))
       this.newfbfile = data;
      }
    );
    /*
    */
  }

  startUpload2() {
    console.log("startUpload2 Step1 started");
    this.uploadS.onFileChangedUI(this.newlocalfile, this.newfbcaption, true,"hansini-blogfiles").then(
      (data) => {
       console.log("startUpload finished");
       this.newupload = false;
      }
    );
  }


}


