import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonUIService } from './commonui.service';

@Component({
  selector: 'tag-details',
  template: `
  <div class="widget tags">
  <header>
    <h3 class="h6">Tags</h3>
  </header>
    <ul class="list-inline"  *ngFor="let tag of tagDetails; let i = index">
        <li class="list-inline-item">
            <a href="#" class="tag">#{{tag}}</a>
        </li>
    </ul>
</div>
  `,
  styleUrls: ['../common/css/hansiniblog.css']
})

export class TagsComponent implements OnInit {
  public tagDetails: string[] = [];
 
  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private blogService : CommonUIService
  ) {
  }

  ngOnInit() {
    this.blogService.getTags(10).subscribe(
      (data) => {
        console.log("recieved response + " + JSON.stringify(data))
        data.forEach((item: { [x: string]: string; }) => {
          this.tagDetails.push(item['uniqueName']);
        });

      },  //not necessary to call _saveJwt from here now.
      (err) => console.log(err),
      () => console.log("Done")
    );
  }


}

