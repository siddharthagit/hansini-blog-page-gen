import { Component} from '@angular/core';
import { TemplageBlogDetailsData } from './models';
import { BaseBlogCreatorComponent } from './baseblogcreator.component';

@Component({
  selector: 'blog-post-template',
  templateUrl: './blogcreatortemplatebased.component.html',
  styleUrls: ['./creator.css']
})
export class BlogCreatorTemplateBasedComponent extends BaseBlogCreatorComponent {
  override blogDetails = new TemplageBlogDetailsData();
}


