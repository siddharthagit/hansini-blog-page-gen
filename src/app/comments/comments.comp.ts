import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { CommentsService } from './comments.service';
import { Comments } from './models';
import { FormStatus, KeyValPair } from '../dblog/models';

@Component({
  selector: 'comments-details',
  templateUrl: './comments.comp.html',
  styleUrls: ['./comments.comp.css', '../common/css/hansiniblog.css']
})

/**
 * Shows the Comments details page from remote server
 */
export class CommentsComponent implements OnInit {
  private sub: any;
  private currentPageID: string = "";
  newComment: Comments = new Comments();
  commentLists: Comments[] = [];
  pageMsg: any;
  pageError: number | undefined;
  @Input() docid: string = "";
  @Output() output = new EventEmitter<FormStatus>();

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private activeRouter: ActivatedRoute,
    public blogService: CommentsService
  ) {
  }

  ngOnInit() {
   
  }

  ngAfterViewInit() {
    this.loadComments();
  }
  loadComments() {
    console.log("load comments" + this.docid);
    if (this.docid != undefined && this.docid != null) {
      this.blogService.getComments(this.docid).then(
        data => {
          data.forEach(d => {
            //let  go:GridObject = d.data() as GridObject;
            let src: any = d.data();
            let go: Comments = new Comments();
            go.u = src["u"];
            go.d = src["d"];
            go.p = src["p"];
            go.s = src["s"];
            go.n = src["n"];
            go.e = src["e"];
            go.i = src["i"];
            go.x = src["x"];

            this.commentLists.push(go)
            console.log("getDatafromFS9x ");
          });
        },
        error => {
          console.log("getDatafromFS errror" + error);
        });
    }
  }

  sanitize(val: string) {
    //return url;
    if (val != null) {
      return this.sanitizer.bypassSecurityTrustUrl(val);
    }
    return "";
  }

  goHome() { }

  addComments() {
    this.newComment.d = new Date().toDateString();
    //this.newComment.p = this.docid; //NO NEED FOR FIELD P
    let path = this.docid + "_" + 100000 + Math.floor(Math.random() * 899999);
    this.newComment.u = path;
    let status: FormStatus = this.validateComment();
    if (status.key == -1) {
      //user form error occured
    }
    else {
      
      console.log("addComments" + JSON.stringify(this.newComment));
      this.blogService.addComment(path, this.newComment).then(() => {
        status.msg = "Updated Successfully";
        status.key = 1
      })
        .catch((error) => {
          console.log(error);
          status.key = -1;
          status.msg = error;
        });
      this.loadComments();

      this.output.next(status);
    }

    this.pageError = status.key;
    this.pageMsg = status.msg

  }

  validateComment() {
    let status: FormStatus = new FormStatus();
      if ( this.newComment.s == "" || this.newComment.n == "" || this.newComment.e == "") {
        status.key = -1;
        status.msg = "Required field value missing"
      }
      if ( this.docid == "") {
        //status.key = -1;
        status.msg = "Required docid value missing"
      }
    return status;
  }
}

