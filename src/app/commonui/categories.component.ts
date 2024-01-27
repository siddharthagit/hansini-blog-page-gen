import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { KeyValPair } from '../creator/models';
import { CommonUIService } from './commonui.service';

@Component({
  selector: 'category-details',
  template: `
  <div class="widget categories">
    <header>
        <h3 class="h6">Categories</h3>
    </header>
    <div class="item d-flex justify-content-between" *ngFor="let cat of categoryDetails; let i = index">
        <a href="#">{{cat.val}}</a>
        <span> </span>
    </div>
  </div>
  `,
  styleUrls: ['../common/css/blog.theme-default.css']
})

export class CategoriesComponent implements OnInit {
  public categoryDetails: KeyValPair[] = [];
  constructor(public blogService: CommonUIService)
  {
  }

  ngOnInit() {
    this.blogService.getCategories(10).subscribe(
      (data) => {
        console.log("recieved response + " + JSON.stringify(data))
        this.categoryDetails = data;
      },  //not necessary to call _saveJwt from here now.
      (err) => console.log(err),
      () => console.log("Done")
    );
  }


}

