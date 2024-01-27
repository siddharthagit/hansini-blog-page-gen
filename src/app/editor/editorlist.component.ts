import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EditorGridObject } from './models';
import { AppConstants, EditorAppConstants } from "../app.constants";
import { CreatorService } from '../creator/creator.service';

import {CommonModule} from '@angular/common';

import { DomSanitizer } from '@angular/platform-browser';
import { BlogContent, BlogImageFile, BlogPara, CodeContent, ImageContent, LineContent, ListContent, TextContent, VideoContent } from './models';
import { HansiniMockService } from './hansinimock.service';
import 'prismjs';
import { PopOverAct } from './models';


@Component({
  selector: 'hs-postlist',
  templateUrl: './editorlist.component.html',
  styleUrls: ['./hansinieditor.css']
})
export class EditorListComponent implements OnInit {
  DEBUG_INFO: string;
  displayObjectList: any[] ;
  constructor(
    public blogService: CreatorService,
    public router: Router,
    public activeRouter: ActivatedRoute) {
      let thisItem = new EditorGridObject("ss", "sssd");
      this.displayObjectList = [];
}

ngOnInit() {
    this.populateGrid();
}

private populateGrid() {
  this.blogService.getObjectsFromLS(EditorAppConstants.localStoreEditName).forEach(element => {
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
  this.blogService.removeSpecificEntryWithIDFromNamedLS(AppConstants.localStoreEditName, lsid);
  this.populateGrid();
}


}

