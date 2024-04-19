import { Component, EventEmitter, Input, Output, OnInit, ElementRef } from '@angular/core';
import { CreatorService } from './creator.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthorInfo, BlogWebpageView, FileUpload2, TemplageBlogDetailsData, TimelineData, TimelineEntry } from './models';
import { AppConstants } from "../app.constants";
import { ArticleImageFile, ArticlePara, CategoryInfo, VideoContent } from '../editor/models';
import { UploadService } from './upload.service';
import { HansiniKeyVal } from '../dblog/models';

@Component({
  selector: 'timeline-post',
  templateUrl: './timeline.component.html',
  styleUrls: ['./creator.css']
})
export class TimelineComponent implements OnInit {
  DEBUG_INFO: string;
  @Input() currentRow: string;
  @Output() addRowEvent = new EventEmitter<object>();
  blogDetails = new TimelineData();
  public currentPageLSID;
  form: FormGroup;
  fileName: string;
  fileData: object;
  protected formDataChanged: boolean = false;
  protected formDataChangedDate: Date = new Date();
  protected sub: any;
  
  constructor(protected sanitizer: DomSanitizer,
    protected blogService: CreatorService,
    protected router: Router,
    protected activeRouter: ActivatedRoute, protected fb: FormBuilder, 
    protected uploadS: UploadService,
    private elementRef:ElementRef) {
     
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
        this.currentPageLSID = this.blogService.createPageId();
        console.log("create new lsid = " +  this.currentPageLSID);
        this.blogDetails = new TimelineData(this.currentPageLSID, "new blog");
        console.log("create object = " +  JSON.stringify(this.blogDetails));
      }
    });

    
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
    this.blogService.addOrUpdateObjectToLS(AppConstants.TYPE_TIMELINE_OBJECT, this.blogDetails);
    
  }

  public goBack() {
    this.router.navigateByUrl('/creator/blog/clist');
  }

  public addRow(event, index) {
    console.log("addRow At " + event['row'] + "" + index);
    this.blogDetails.paras.splice(event['row'], 0, new TimelineEntry("" , event['type'], '', ''))
  }

  public getParagraphType(paragraph: ArticlePara) {
    return paragraph.type;
  }

  filterBy(order: string) {
    return this.blogDetails.paras.sort((a, b) => a[order] > b[order] ? 1 : a[order] === b[order] ? 0 : -1);
  }

  takeUp(paragraph: TimelineEntry, order: number) {
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

  public echoHTML(data:string) {
    console.log("sidd echohtml" + data);
  }

  ngOnChanges() {
    console.log("ngonchanges2");
    const hostElem = this.elementRef.nativeElement;
    console.log(hostElem.children);
    //https://stackoverflow.com/questions/34890620/how-to-get-specified-htmlelement-in-my-view-using-angular2-and-typescript
    console.log(this.elementRef.nativeElement.querySelector('#timelinediv').innerHTML);
}


}


