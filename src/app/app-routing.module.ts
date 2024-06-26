import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatorComponent} from './creator/creator.component'
import { ListComponent } from './creator/list.component';
import { HtmlResultComponent } from './creator/htmlresult.component';
import { AppComponent } from './app.component';
import { HansiniMockService } from './editor/hansinimock.service';
import { EditorListComponent } from './editor/editorlist.component';
import { BlogListComponent, BlogViewDetailsComponent } from './dblog';
import { HansiniEditor } from './editor/hansinieditor.component';
import { BlogCreatorTemplateBasedComponent } from './creator/blogcreatortemplatebased.component';
import { FirebaseImageBrowserComponent } from './creator/firebaseimages.component';
import { TimelineComponent } from './creator/timeline.component';



const routes: Routes = [

  {
    path: 'blog',
    component: BlogListComponent
  },  
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
  
    {
      path: 'events/:uniqueID',
      component: BlogViewDetailsComponent
    },
    
  {
    path: 'display',
    component: AppComponent
  },


  {
    path: 'creator',
    component: CreatorComponent
  },
  {
    path: 'tempaltebasedcreator',
    component: BlogCreatorTemplateBasedComponent
  },

  {
    path: 'imagelist',
    component: FirebaseImageBrowserComponent
  },
  
  {
    path: 'clist',
    component: ListComponent
  },
  {
    path: 'htmlview',
    component: HtmlResultComponent
  },
  {
    path: 'editor',
    component: HansiniEditor
  },
  {
    path: 'editorlist',
    component: EditorListComponent
  },

  //timeline related
  {
    path: 'timelinecreator',
    component: TimelineComponent
  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[HansiniMockService]
})
export class AppRoutingModule { }
