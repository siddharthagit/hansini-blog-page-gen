import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { AuthorInfo, TemplageBlogDetailsData } from './models';
import { AppConstants } from "../app.constants";
import { ArticlePara, CategoryInfo, VideoContent } from '../editor/models';
import { CreatorBaseComponent } from './creatorbase.comp';

@Component({
  selector: 'blog-post',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.css']
})
export class CreatorComponent extends CreatorBaseComponent {
  @Input() currentRow: string;
  @Output() addRowEvent = new EventEmitter<object>();
  blogDetails = new TemplageBlogDetailsData();
  languages = ['java', 'javascript', 'html', 'xml'];
  uploadFilestoFirebase: boolean = true;
  paragraphTypeTitleMap = new Map();
  allCategoriesUIData : CategoryInfo;
  allAuthorUIData : Array<AuthorInfo>;

  
  override ngOnInit() {
    this.sub = this.activeRouter.queryParams.subscribe(params => {
      this.currentPageLSID = params['lsid'];
      console.log('route parameter lsid = ' + this.currentPageLSID);
      if (this.currentPageLSID != undefined && this.currentPageLSID != null) {
        console.log('load from LS or Server lsid = ' + this.currentPageLSID);
        let localBlogDetails = this.blogService.getObjectByID(AppConstants.TYPE_BLOGSTORY_OBJECT, this.currentPageLSID);
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
    this.blogService.saveObject(AppConstants.TYPE_BLOGSTORY_OBJECT,this.blogDetails.lsid, this.blogDetails);
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
    //console.log("sanitize " + JSON.stringify(val));
    if (val != null) {
      return this.sanitizer.bypassSecurityTrustUrl(val);
    }
    else return "";
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


