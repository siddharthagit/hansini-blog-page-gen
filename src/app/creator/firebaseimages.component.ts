import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CreatorService } from './creator.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthorInfo, BlogWebpageView, FileUpload2, TemplageBlogDetailsData } from './models';
import { AppConstants } from "../app.constants";
import { ArticleImageFile, ArticlePara, CategoryInfo, ImageContent, VideoContent } from '../editor/models';
import { UploadService } from './upload.service';
import { HansiniKeyVal } from '../dblog/models';

@Component({
  selector: 'blog-image-list',
  templateUrl: './firebaseimages.component.html',
  styleUrls: ['./creator.css']
})
export class FirebaseImageBrowserComponent implements OnInit {
  DEBUG_INFO: string;
  
  fbImages:ImageContent[] = [];
  newfbcaption: string = "";
  newupload:boolean = false;
  newlocalfile:any = null;
  newfbfile :ArticleImageFile = new ArticleImageFile();
  constructor(protected sanitizer: DomSanitizer,
    protected blogService: CreatorService,
    protected router: Router,
    protected activeRouter: ActivatedRoute, protected fb: FormBuilder, 
    protected uploadS: UploadService) {
   
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

  ngOnInit() {
    
    this.fbImages = this.uploadS.listImages("hansini-blogfiles");
    
  }

}


