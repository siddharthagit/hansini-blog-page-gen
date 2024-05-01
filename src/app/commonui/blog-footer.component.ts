import {Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { SiteConfig } from '../creator/models';
import { CommonUIService } from './commonui.service';

@Component({
  selector: 'blog-footer',
  templateUrl: './blog-footer.component.html',
  styleUrls: ['../common/css/hansiniblog.css']
})

export class BlogFooterComponent implements OnInit {
  siteConfig:SiteConfig  = new SiteConfig();
  constructor(public blogService: CommonUIService) { }

  ngOnInit() {
    this.blogService.getSiteConfig().subscribe(
      data => {
        console.log("Load object from FS CALL 1");
        this.siteConfig = data;
      },
      error => {
        console.log("getDatafromFS errror" + error);
      });
  }
}

