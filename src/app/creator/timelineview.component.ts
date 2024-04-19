import { Component, EventEmitter, Input, Output, OnInit, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
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
  selector: 'timeline-view',
  templateUrl: './timelineview.component.html',
  styleUrls: ['./timeline.css']
})
export class TimelineViewComponent implements OnInit {
  @Input() inData: TimelineData;
  @Output() outData = new EventEmitter<string>();

  DEBUG_INFO: string;
  blogDetails = new TimelineData();
  public currentPageLSID;
  protected sub: any;
  
  timelineviewcontainer: ViewContainerRef;
  @ViewChild('timelineviewcontainer') someHTML: ElementRef;

  constructor(protected sanitizer: DomSanitizer,
    protected blogService: CreatorService,
    protected router: Router,
    protected activeRouter: ActivatedRoute, protected fb: FormBuilder, 
    protected uploadS: UploadService) {
     
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

  ngOnChanges() {
        console.log("ngonchanges");
        this.emitHTML();
  }

  public emitHTML() {
    this.outData.next(this.someHTML.nativeElement.outerHTML);
  }
}


