import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CreatorComponent } from './creator/creator.component';
import { CreateInlineTooltip } from './creator/inline-tooltip.component';
import { CreatorService } from './creator/creator.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ListComponent } from './creator/list.component';
import { HtmlResultComponent } from './creator/htmlresult.component';
import { SafeHTML } from './safeHTML.pipe';
import { RouterModule } from '@angular/router';
import { HansiniEditor } from './editor/hansinieditor.component';
import { PopoverToolBar } from './editor/popovertoolbar.component';
import { PopoverActionBar } from './editor/popoveractionbar.component';
import { EditorListComponent } from './editor/editorlist.component';
import { HansiniBlogModule } from './dblog/blog.module';

//Firebase Related -->
import { AngularFireModule } from '@angular/fire/compat/';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import { BlogCreatorTemplateBasedComponent } from './creator/blogcreatortemplatebased.component';
import { UploadService } from './creator/upload.service';
import { FirebaseImageBrowserComponent } from './creator/firebaseimages.component';


@NgModule({
  declarations: [
    AppComponent,
    BlogCreatorTemplateBasedComponent,
    CreatorComponent,
    CreateInlineTooltip,
    ListComponent,
    HtmlResultComponent,
    SafeHTML,
    HansiniEditor,
    PopoverToolBar,
    PopoverActionBar,
    EditorListComponent,
    FirebaseImageBrowserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HansiniBlogModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features

    
  ],
  providers: [CreatorService, UploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
