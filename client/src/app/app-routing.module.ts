import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PostComponent } from './components/post/post.component';
import { PostReviewComponent } from './components/post-review/post-review.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { FeedComponent } from './components/feed/feed.component';
import { CategoryComponent } from './components/category/category.component';
import { ProfileComponent } from './components/profile/profile.component';



const routes: Routes = [
    {path:"login", component: LoginComponent },
    {path:"register", component: RegisterComponent },
    {path:"", component: FeedComponent },
    {path: "createpost", component: CreatePostComponent},
    {path: "post/:id", component: PostComponent},
    {path: "category/:category", component: CategoryComponent},
    {path: "profile/:username", component: ProfileComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
