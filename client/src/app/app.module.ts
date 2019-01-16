import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { QuillModule } from 'ngx-quill';
import { FileSelectDirective } from 'ng2-file-upload';







import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PostComponent } from './components/post/post.component';
import { PostReviewComponent } from './components/post-review/post-review.component';
import { CategoryPostsComponent } from './components/category-posts/category-posts.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { FeedComponent } from './components/feed/feed.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import {AuthenticationService} from './services/authentication.service';
import {RegisterService} from './services/register.service';
import {PostService} from './services/post.service';
import { PostAuthorComponent } from './components/post-author/post-author.component'



@NgModule({
    declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PostComponent,
    PostReviewComponent,
    CategoryPostsComponent,
    CreatePostComponent,
    FeedComponent,
    NavbarComponent,
    FileSelectDirective,
    PostAuthorComponent
  ],
    imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    RouterModule,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
    QuillModule
  ],
    providers: [AuthenticationService,
               RegisterService,
               PostService
               ],
    bootstrap: [AppComponent]
})
export class AppModule {}
