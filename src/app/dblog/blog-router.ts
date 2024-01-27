import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Blog Related
import { BlogViewDetailsComponent } from './blog-viewdetails.component'
import { BlogListComponent } from './blog-list.component'

const routes: Routes = [

  {
    path: '',
    component: BlogListComponent
  },

  {
    path: 'blog/category/:uniqueID',
    component: BlogListComponent
  },

  {
    path: 'viewdetails/:uniqueID',
    component: BlogViewDetailsComponent
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }


