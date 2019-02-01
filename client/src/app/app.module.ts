import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import { QuillModule } from 'ngx-quill';
import {AngularFittextModule} from 'angular-fittext';








import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PostComponent } from './components/post/post.component';
import { PostReviewComponent } from './components/post-review/post-review.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { FeedComponent } from './components/feed/feed.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PostAuthorComponent } from './components/post-author/post-author.component';



import {AuthenticationService} from './services/authentication.service';
import {RegisterService} from './services/register.service';
import {PostService} from './services/post.service';
import {AuthorService } from './services/author.service';
import {CategoryService} from './services/category.service';
import { CategoryComponent } from './components/category/category.component';
import { ProfileComponent } from './components/profile/profile.component';


@NgModule({
    declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PostComponent,
    PostReviewComponent,
    CreatePostComponent,
    FeedComponent,
    NavbarComponent,
    PostAuthorComponent,
    CategoryComponent,
    ProfileComponent
  ],
    imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    RouterModule,
    QuillModule,
        AngularFittextModule

  ],
    providers: [AuthenticationService,
               RegisterService,
               PostService
               ],
    bootstrap: [AppComponent]
})
export class AppModule {}