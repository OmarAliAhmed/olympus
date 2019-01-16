import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PostComponent } from './components/post/post.component';
import { PostReviewComponent } from './components/post-review/post-review.component';
import { CategoryPostsComponent } from './components/category-posts/category-posts.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { FeedComponent } from './components/feed/feed.component';

const routes: Routes = [
    {path:"login", component: LoginComponent },
    {path:"register", component: RegisterComponent },
    {path:"", component: FeedComponent },
    {path: "createpost", component: CreatePostComponent},
    {path: "post/:id", component: PostComponent}

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
