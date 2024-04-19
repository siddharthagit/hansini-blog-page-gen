import { Component } from '@angular/core';
import { GridObject } from './models';
import { AppConstants } from "../app.constants";
import { CreatorBaseComponent } from './creatorbase.comp';
@Component({
  selector: 'blog-postlist',
  templateUrl: './list.component.html',
  styleUrls: ['./creator.css',]
})
export class ListComponent extends CreatorBaseComponent {

  displayObjectList: any[];

  override ngOnInit() {
    this.populateGrid();
  }

  private populateGrid() {
    this.displayObjectList = [];
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
    let url = "htmlview?lsid=" + lsid
    window.open(url, "draft");
  }

  public gotoEditPage(lsid: string) {
    console.log("gotoEditPage() with  lsid = " + lsid);
    this.router.navigateByUrl('/creator?lsid=' + lsid);
  }

  public deleteAction(lsid: string) {
    console.log("deleteAction ");
    this.blogService.removeSpecificEntryWithIDFromNamedLS(AppConstants.TYPE_BLOGSTORY_OBJECT, lsid);
    this.populateGrid();
  }

}

