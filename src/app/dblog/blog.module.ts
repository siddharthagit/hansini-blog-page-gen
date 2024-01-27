import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { BlogListComponent }    from './blog-list.component';
import { BlogViewDetailsComponent }  from './blog-viewdetails.component';
import { BlogFireServiceImpl } from './blog.fireservice';
import { CommonUIModule } from '../commonui/commonui.module';
import { BlogRoutingModule } from './blog-router';
import { HansiniCommentsModule } from '../comments/comments.module';
import { FormsModule } from '@angular/forms';
import { BlogLSServiceImpl } from './blog.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BlogRoutingModule,
    CommonUIModule,
    HansiniCommentsModule

  ],

  declarations: [
    BlogListComponent,
    BlogViewDetailsComponent,
   
  ],
  providers: [BlogFireServiceImpl, BlogLSServiceImpl]
})
export class HansiniBlogModule {}
