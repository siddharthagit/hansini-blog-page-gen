import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CreatorService } from './creator.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthorInfo, BlogWebpageView, TemplageBlogDetailsData } from './models';
import { AppConstants } from "../app.constants";
import { ArticleImageFile, ArticlePara, CategoryInfo, VideoContent } from '../editor/models';

@Component({
  selector: 'blog-post',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.css']
})
export class CreatorComponent implements OnInit {
  DEBUG_INFO: string;
  @Input() currentRow: string;
  @Output() addRowEvent = new EventEmitter<object>();
  blogDetails = new TemplageBlogDetailsData();
  public currentPageLSID;
  form: FormGroup;
  fileName: string;
  fileData: object;
  protected formDataChanged: boolean = false;
  protected formDataChangedDate: Date = new Date();
  protected sub: any;
  languages = ['java', 'javascript', 'html', 'xml'];

  paragraphTypeTitleMap = new Map();

  allCategoriesUIData : CategoryInfo;
  allAuthorUIData : Array<AuthorInfo>;

  constructor(protected sanitizer: DomSanitizer,
    protected blogService: CreatorService,
    protected router: Router,
    protected activeRouter: ActivatedRoute, protected fb: FormBuilder) {
      this.paragraphTypeTitleMap.set("TXT", "Description");
      this.paragraphTypeTitleMap.set("VID", "Video");
      this.paragraphTypeTitleMap.set("URL", "URL");
      this.paragraphTypeTitleMap.set("COD", "Code");
      this.paragraphTypeTitleMap.set("GIT", "Git");
      this.paragraphTypeTitleMap.set("LIS", "List");
  }

  ngOnInit() {
    this.sub = this.activeRouter.queryParams.subscribe(params => {
      this.currentPageLSID = params['lsid'];
      console.log('route parameter lsid = ' + this.currentPageLSID);
      if (this.currentPageLSID != undefined && this.currentPageLSID != null) {
        console.log('load from LS or Server lsid = ' + this.currentPageLSID);
        let localBlogDetails = this.blogService.findObjectByIDFromLS(this.currentPageLSID);
        if (localBlogDetails != null) {
          console.log('load object from LS =  ' + JSON.stringify(localBlogDetails));
          this.blogDetails = localBlogDetails;
        }
        else {
          console.log("not found in LS");
        }
      }
      else {
        console.log("create new lsid");
        let blodID = this.blogService.createPageId();
        console.log("create new lsid = " +  blodID);
        this.blogDetails = new TemplageBlogDetailsData(blodID, "new blog");
        console.log("create object = " +  JSON.stringify(this.blogDetails));
      }
    });

    this.allCategoriesUIData = this.blogService.getAllCategoriesStatic();
    this.allAuthorUIData = this.blogService.getAllUsersStatic();
    
  }

  public onThisTaskMouseEnter(p: ArticlePara) {
    console.log("sidd");
  }

  public onThisTaskMouseLeave(p: ArticlePara) {
    console.log("sidd");
  }

  public checkifNoUpdateNeeded() {
    return !this.formDataChanged;
  }

  public saveObject() {
    console.log("saveObject " + JSON.stringify(this.blogDetails));
    //this.blogDetails.objectType = environment.TYPE_BLOGSTORY_OBJECT;
    //this.blogDetails.ud = this.formDataChangedDate;
    this.blogService.addOrUpdateObjectToLS(AppConstants.TYPE_BLOGSTORY_OBJECT, this.blogDetails);
  }

  public goBack() {
    this.router.navigateByUrl('/creator/blog/clist');
  }

  public addRow(event, index) {
    //this.blogDetails.paragraphs.push(new BlogParagraph(event['row'], event['type'], ''));
    console.log("addRow At " + event['row'] + "" + index);
    this.blogDetails.paras.splice(event['row'], 0, new ArticlePara("" , event['type']))
  }

  public getParagraphType(paragraph: ArticlePara) {
    return paragraph.type;
  }

  filterBy(order: string) {
    return this.blogDetails.paras.sort((a, b) => a[order] > b[order] ? 1 : a[order] === b[order] ? 0 : -1);
  }

  takeUp(paragraph: ArticlePara, order: number) {
    console.log("takeUp" + order);
    if (order > 0) {
      let topParagraph = this.blogDetails.paras[order - 1];
      this.blogDetails.paras[order - 1] = paragraph;
      this.blogDetails.paras[order] = topParagraph;
    }
  }

  takeDown(paragraph: ArticlePara, order: number) {
    console.log("takeDown" + order);
  }

  deleteParatraph(paragraph: ArticlePara, order: number) {
    console.log("delete item order = " + order);
    this.blogDetails.paras.splice(order, 1);
  }

  extactvideo(para: ArticlePara) {
    //return url;
    console.log("extractVideo : + val sd= " + JSON.stringify(para));
    if (para.type != "vid") return "";
    let content:VideoContent = para.content as VideoContent;
    var video_id = ""; //bzSTpdcs-EI
   

    if (content != null && content.url != null) {
      if (content.url.indexOf("v=") > -1) {
        video_id = content.url.split('v=')[1];
        //console.log("extractVideo : + val = , video_id =  " + content.url + " " + video_id);

        var ampersandPosition = video_id.indexOf('&');
        if (ampersandPosition != -1) {
          video_id = video_id.substring(0, ampersandPosition);
        }
      }
    }
    console.log("extractVideo : video_id= " + video_id);
    video_id = "https://www.youtube.com/embed/" + video_id;
    para['updateVideo'] = false;
    return this.sanitizer.bypassSecurityTrustResourceUrl(video_id);
  }

  sanitize(val) {
    if (!val) return "";
    console.log("sanitize " + JSON.stringify(val));
    if (val != null) {
      return this.sanitizer.bypassSecurityTrustUrl(val);
    }
    else return "";
  }

  onFileChanged(event: any, paragraph) {
    console.log("onFileChanged event" + JSON.stringify(event));
    if (event.target.files && event.target.files.length > 0) {
      let reader = new FileReader();
      let file = event.target.files[0];
      console.log("onFileChanged file " + JSON.stringify(file));
      reader.readAsDataURL(file);
      reader.onload = () => {
        let aif: ArticleImageFile = new ArticleImageFile();
        aif.name = file.name;
        aif.type = file.type;
        aif.url = "";
        let filePreview = reader.result;
        console.log("filePreview = " + filePreview);
        paragraph.file = aif;
        paragraph.pv = reader.result;
      };
    }
  }

  public editMeDone(event) {
    console.log("editMeDone");
    this.formDataChanged = true;
    this.formDataChangedDate = new Date();
  }

  public editMe(event) {
    console.log("editMe");
  }

  public editVideoURL(para: ArticlePara) {
    para['updateVideo'] = true;
    console.log("editVideoURL" + JSON.stringify(para));
  }

}


