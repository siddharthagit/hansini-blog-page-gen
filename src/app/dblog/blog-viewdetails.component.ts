import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { BlogFireServiceImpl } from './blog.fireservice';
//import { CreatableBlogObject, FormStatus } from '../creator/models';
import { Title, Meta } from '@angular/platform-browser';
import { BlogDetailsData } from '../creator/models';
import { BlogLSServiceImpl } from './blog.service';
import { AppConstants } from '../app.constants';
//import { CreatableBlogObject } from './models';

@Component({
  selector: 'blog-details',
  templateUrl: './blog-viewdetails.component.html',
  styleUrls: ['./blog.component.css', '../common/css/blog.theme-default.css']
})

/**
 * Shows the Blog details page from remove server
 */
export class BlogViewDetailsComponent implements OnInit {
  private sub: any;
  private currentPageID: string  = "";
  blogDetails: BlogDetailsData = new BlogDetailsData();
  javaCode2: string = `public class JakartaRestfulApp extends Application {
    private final <Set> classes;

    public JakartaRestfulApp() {
        HashSet> c = new HashSet>();
        c.add(MenuResource.class);
        classes = Collections.unmodifiableSet(c);
    }

    @Override
    public <Set> getClasses() {
        return classes;
    }
}`;

  //from commentscomponent
  //comments: FormStatus = new FormStatus();

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private activeRouter: ActivatedRoute,
    public blogService: BlogLSServiceImpl,
    private metaService: Meta
    
  ) {
  }

  ngOnInit() {
    this.sub = this.activeRouter.params.subscribe(params => {
      this.currentPageID = params['uniqueID'];
      console.log('***** this.currentPageID ' + JSON.stringify(this.currentPageID));
      
   });

    if (this.currentPageID != undefined && this.currentPageID != null) {
      this.blogService.getPostByID(AppConstants.TYPE_BLOGSTORY_OBJECT, this.currentPageID).subscribe(
        (doc) => {
          console.log('***** fs doc  ' + JSON.stringify(doc));
          this.blogDetails = doc;
          let title:string = this.blogDetails.pre.tle;
          let desc: string = this.blogDetails.pre.summ;
          let key: string = this.blogDetails.seo.k;
          this.addSEOTag(title,desc, key);
        },
        err => {
          console.log("blog details got error");
          console.log(err);
          this.router.navigateByUrl("/404");
        },
        () => console.log("Done")
      );
    }
  }

  sanitize(val: string) {
    //return url;
    if (val != null) {
      return this.sanitizer.bypassSecurityTrustUrl(val);
    }
    return "";
  }

  goHome (){}

  addCommentsAction () {
    console.log("addCommentsAction");
  }

  addSEOTag(title:string, desc:string, key:string) {
    this.metaService.addTag({ name: 'description', content: desc });
    this.metaService.addTag({ name: 'robots', content: 'index,follow' });
    this.metaService.addTag({ property: 'og:title', content: title });
    this.metaService.addTag({ property: 'keywords', content: key });
  }

  explodeList(raw:string) {
   
    let ret = raw.split("\n");
    return ret;
  }
}

