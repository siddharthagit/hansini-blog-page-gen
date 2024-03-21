import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CreatorService } from './creator.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GridObject } from './models';
import { AppConstants } from "../app.constants";
import { CommonModule } from '@angular/common';
@Component({
  selector: 'blog-postlist',
  templateUrl: './list.component.html',
  styleUrls: ['./creator.css',]
})
export class ListComponent implements OnInit {
  DEBUG_INFO: string;
  displayObjectList: any[] ;
  constructor(
    public blogService: CreatorService,
    public router: Router,
    public activeRouter: ActivatedRoute) {
      let thisItem = new GridObject("ss", "sssd");
      this.displayObjectList = [];
}

ngOnInit() {
    this.populateGrid();
}

private populateGrid() {
  this.blogService.getObjectsFromLS(AppConstants.TYPE_BLOGSTORY_OBJECT).forEach(element => {
      console.log("Object: " + JSON.stringify(element));
      if (element != null) {
          let thisItem = new GridObject(element['_id'], element['name']);
          thisItem['updatedDateTime'] = element['updatedDateTime'];
          thisItem['status'] = element['status'];
          this.displayObjectList.push(thisItem);
      }
  });
}

  public changeStatusTxt(status) {
    let ret = "DRAFT";
    if (status == "DRAFT")
      ret = "PUBLIC";
    return ret;
  }

  public getPageTitle(): string {
    return "Local Pages"
  }

  public openWindow(lsid) {
    console.log("openWindow");
    let url =   "htmlview?lsid=" + lsid
    window.open(url, "draft");
  }

  public gotoEditPage(lsid: string) {
    console.log("gotoEditPage() with  lsid = " + lsid);
    this.router.navigateByUrl('/creator?lsid=' + lsid);
}

public deleteAction(lsid: string) {
  console.log("deleteAction ");
  this.blogService.removeSpecificEntryWithIDFromNamedLS(AppConstants.localStoreEditName, lsid);
  this.populateGrid();
}

}

