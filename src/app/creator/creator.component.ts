import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CreatorService } from './creator.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BlogWebpageObject } from './models';
import { AppConstants } from "../app.constants";
import { ArticlePara } from '../editor/models';

@Component({
  selector: 'blog-post',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.css']
})
export class CreatorComponent implements OnInit {
  DEBUG_INFO: string;
  @Input() currentRow: string;
  @Output() addRowEvent = new EventEmitter<object>();
  blogDetails = new BlogWebpageObject();
  public currentPageLSID;
  form: FormGroup;
  fileName: string;
  fileData: object;
  protected formDataChanged: boolean = false;
  protected formDataChangedDate: Date = new Date();
  protected sub: any;
  languages = ['java', 'javascript', 'html', 'xml'];

  paragraphTypeTitleMap = new Map();

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
          this.blogDetails = this.blogDetails.decodeBlog(localBlogDetails);
        }
        else {
          console.log("not found in LS");
        }
      }
      else {
        let blodID = this.blogService.createPageId();
        this.blogDetails = new BlogWebpageObject(blodID, "new blog");
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
    //this.blogDetails.objectType = environment.TYPE_BLOGSTORY_OBJECT;
    this.blogDetails.ud = this.formDataChangedDate;
    this.blogService.addOrUpdateObjectToLS(AppConstants.localStoreEditName, this.blogDetails);
  }

  public goBack() {
    this.router.navigateByUrl('/creator/blog/clist');
  }

  public addRow(event, index) {
    //this.blogDetails.paragraphs.push(new BlogParagraph(event['row'], event['type'], ''));
    console.log("addRow At " + event['row'] + "" + index);
    this.blogDetails.displayWidgets.splice(event['row'], 0, new ArticlePara("" , event['type']))
  }

  public getParagraphType(paragraph: ArticlePara) {
    return paragraph.type;
  }

  filterBy(order: string) {
    return this.blogDetails.displayWidgets.sort((a, b) => a[order] > b[order] ? 1 : a[order] === b[order] ? 0 : -1);
  }

  takeUp(paragraph: ArticlePara, order: number) {
    console.log("takeUp" + order);
    if (order > 0) {
      let topParagraph = this.blogDetails.displayWidgets[order - 1];
      this.blogDetails.displayWidgets[order - 1] = paragraph;
      this.blogDetails.displayWidgets[order] = topParagraph;
    }
  }

  takeDown(paragraph: ArticlePara, order: number) {
    console.log("takeDown" + order);
  }

  deleteParatraph(paragraph: ArticlePara, order: number) {
    console.log("delete item order = " + order);
    this.blogDetails.displayWidgets.splice(order, 1);
  }

  extactvideo(para: ArticlePara) {
    //return url;
    var video_id = ""; //bzSTpdcs-EI
    console.log("extractVideo : + val sd= " + para.content);

    if (para != null && para.content != null) {
      /*if (para.content.indexOf("v=") > -1) {
        video_id = para.content.split('v=')[1];
        console.log("extractVideo : + val = , video_id =  " + para.content + " " + video_id);

        var ampersandPosition = video_id.indexOf('&');
        if (ampersandPosition != -1) {
          video_id = video_id.substring(0, ampersandPosition);
        }
      }*/
    }
    console.log("extractVideo : video_id= " + video_id);
    video_id = "https://www.youtube.com/embed/" + video_id;
    para['updateVideo'] = false;
    return this.sanitizer.bypassSecurityTrustResourceUrl(video_id);
  }

  sanitize(val) {
    console.log("sanitize " + JSON.stringify(val));
    if (val != null) {
      return this.sanitizer.bypassSecurityTrustUrl(val);
    }
    else return "";
  }

  onFileChanged(paragraph, isParagraph, event: any) {
    console.log("onFileChanged event" + JSON.stringify(event));
    if (event.target.files && event.target.files.length > 0) {
      let reader = new FileReader();
      let file = event.target.files[0];
      console.log("onFileChanged file " + JSON.stringify(file));
      reader.readAsDataURL(file);
      reader.onload = () => {
        let fileMeta = { name: file.name, type: file.type };
        //alert("done" + JSON.stringify(reader));
        //let filePreview = 'data:image/png' + ';base64,' + reader.result.slice(',')[1];
        let filePreview = "";
        //alert("done" + filePreview);
        alert("done" + isParagraph);
        if (isParagraph)
          paragraph.content = filePreview;
        else {
          paragraph.mainImage = filePreview;
        }
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


