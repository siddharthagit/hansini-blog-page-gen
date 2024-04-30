import { Component } from '@angular/core';
import { EditorGridObject } from './models';
import { AppConstants, EditorAppConstants } from "../app.constants";
import { CreatorBaseComponent } from '../creator/creatorbase.comp';

@Component({
  selector: 'hs-postlist',
  templateUrl: './editorlist.component.html',
  styleUrls: ['./hansinieditor.css']
})
export class EditorListComponent extends CreatorBaseComponent {
  displayObjectList: any[] ;

override ngOnInit() {
    this.populateGrid();
}

private populateGrid() {
  this.blogService.getAllObjects(EditorAppConstants.localStoreEditName).forEach(element => {
      console.log("Object: " + JSON.stringify(element));
      if (element != null) {
       
          let firstP = element.para[0].content.data;
          console.log("to Grid : " + firstP);

          let thisItem = new EditorGridObject(element['id'], firstP + "sss");
          thisItem['updatedDateTime'] = element['updatedDateTime'];
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
    let url =   "editor?lsid=" + lsid
    window.open(url, "draft");
  }

  public gotoEditPage(lsid: string) {
    console.log("gotoEditPage() with  lsid = " + lsid);
    this.router.navigateByUrl('/editor?lsid=' + lsid);
}

public deleteAction(lsid: string) {
  console.log("deleteAction ");
  this.blogService.deleteByID(AppConstants.localStoreEditName, lsid);
  this.populateGrid();
}


}

