import { Component, EventEmitter, Input, Output, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { TimelineData } from './models';
import { CreatorBaseComponent } from './creatorbase.comp';
import { AppConstants } from '../app.constants';

@Component({
  selector: 'timeline-view',
  templateUrl: './timelineview.component.html',
  styleUrls: ['./timeline.css']
})
export class TimelineViewComponent extends CreatorBaseComponent {
  @Input() inData: TimelineData;
  @Output() outData = new EventEmitter<string>();
  blogDetails = new TimelineData();
  
  timelineviewcontainer: ViewContainerRef;
  @ViewChild('timelineviewcontainer') someHTML: ElementRef;


  override ngOnInit() {
    this.sub = this.activeRouter.queryParams.subscribe(params => {
      this.currentPageLSID = params['lsid'];
      console.log('route parameter lsid = ' + this.currentPageLSID);
      if (this.currentPageLSID != undefined && this.currentPageLSID != null) {
        console.log('load from LS or Server lsid = ' + this.currentPageLSID);
        let localBlogDetails = this.blogService.getObjectByID(AppConstants.TYPE_TIMELINE_OBJECT,this.currentPageLSID);
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


