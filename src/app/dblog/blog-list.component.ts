import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppConstants } from '../app.constants';
import { BlogFireServiceImpl } from './blog.fireservice';
import { BlogService } from './blog.iservice';
import { BlogLSServiceImpl } from './blog.service';
import { CreatableBlogObject, SiteConfig } from './models';

const BLOG_COLL_NAME = "rootblogstory";
@Component({
  selector: 'blog-details',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog.component.css', '../common/css/hansiniblog.css']
})

/**
 * Shows list of blogs
 */
export class BlogListComponent implements OnInit {

  public blogList: CreatableBlogObject[] = [];
  public categoryDetails: object[] = [];
  public localStoreEditName = "EditLS";
  siteConfig: SiteConfig = new SiteConfig();
  protected sub: any;
  catID: string = "";

  public newEmail: string = "";

  pageMsg: any;
  pageError: number | undefined;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(
    private router: Router,
    private activeRouter: ActivatedRoute, public blogService: BlogLSServiceImpl) {
    this.sub = this.activeRouter.params.subscribe(params => {
      this.catID = params['uniqueID'];
      console.log('***** path params fsCollectionName ' + this.catID);
    });

  }

  ngOnInit() {
    console.log('Blog ngONInit invoked');
    this.blogService.getSiteConfig().subscribe(
      data => {
        this.siteConfig = data;
      },
      error => {
      });

    this.blogService.getPosts(AppConstants.localStoreEditName, 10, this.catID, "").subscribe(
      (data) => {
        console.log("getPosts: recieved response + " + JSON.stringify(data));
        this.blogList = [];
        //var newData = data;//data.json();
        data.forEach(item1 => {
          let item = item1.data() as CreatableBlogObject;
          console.log("p3" + JSON.stringify(item['ud'].c.val));
          this.blogList.push(item);
        });
      }
    );
   
    this.blogService.getCategories(10).subscribe(
      (data) => {
        console.log("recieved response + " + JSON.stringify(data))
        data.forEach((item: { [x: string]: any; }) => {
          this.categoryDetails.push({ uniqueName: item['uniqueName'], count: item['count'] });
        });

      },  //not necessary to call _saveJwt from here now.
      (err) => console.log(err),
      () => console.log("Done")
    );
  }

  addEmail() {
    let obj: any = {}

    let valid: boolean = this.isValidEmail(this.newEmail);
    if (!valid) {
      this.pageMsg = "Invalid Email";
      this.pageError = -1
    }
    else {
      obj['e'] = this.newEmail;
      obj['d'] = new Date();
      this.blogService.addEmailForNewsLetter(this.newEmail, obj).subscribe(() => {
        this.pageMsg = "Updated Successfully";
        this.pageError = 1
      }) /*.
        .((error) => {
          console.log(error);
          this.pageError = -1;
          this.pageMsg = error;
        })*/;
    }



  }

  isValidEmail(search: string): boolean {
    var result: boolean;
    let regexp = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$');
    result = regexp.test(search);
    return result
  }
}

