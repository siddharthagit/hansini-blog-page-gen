import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
//import { HansiniCalendarModule } from '../poc/cal/cal-module';
import { BlogFooterComponent } from './blog-footer.component';
import { BlogHeaderComponent } from './blog-header.component';
import { RouterModule } from '@angular/router';
import { CommonUIService } from './commonui.service';
import { CategoriesComponent } from './categories.component';
import { TagsComponent } from './tags.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    //HansiniCalendarModule
  ],
  declarations: [
    BlogHeaderComponent,
    BlogFooterComponent,
    CategoriesComponent,
    TagsComponent
    
  ],
  exports: [BlogHeaderComponent,BlogFooterComponent,CategoriesComponent,TagsComponent],
  providers: [CommonUIService]
})
export class CommonUIModule {}
