import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './comments.comp';
import { CommentsService } from './comments.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule

  ],

  declarations: [
    CommentsComponent,
  ],
  exports: [CommentsComponent],
  providers: [CommentsService]
})
export class HansiniCommentsModule { }