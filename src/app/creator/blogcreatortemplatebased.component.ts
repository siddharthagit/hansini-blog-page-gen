import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CreatorService } from './creator.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BlogWebpageView, TemplageBlogDetailsData } from './models';
import { AppConstants } from "../app.constants";
import { ArticlePara } from '../editor/models';
import { BaseBlogCreatorComponent } from './baseblogcreator.component';

@Component({
  selector: 'blog-post-template',
  templateUrl: './blogcreatortemplatebased.component.html',
  styleUrls: ['./creator.css']
})
export class BlogCreatorTemplateBasedComponent extends BaseBlogCreatorComponent {
  override blogDetails = new TemplageBlogDetailsData();
  
  constructor( sanitizer: DomSanitizer,
      blogService: CreatorService,
     router: Router,
     activeRouter: ActivatedRoute,  fb: FormBuilder) {
    super(sanitizer,blogService, router, activeRouter, fb );
      
  }
}


