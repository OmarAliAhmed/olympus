import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthorService} from '../../services/author.service';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    constructor(private activatedRoute: ActivatedRoute, private authorservice: AuthorService) {}f  
    
    username;
    author;
    authorDataLoaded = false;
    posts;
    ifPostsLoaded = false;

    getProfileImageURL(author) {
        author.profileImage = `${environment.host}/${author.profileImage}`;
    }
    arrGetPostImageURL(posts) {
        for (let i = 0; i < posts.length; i++) {
            posts[i].postImage = `${environment.host}/${posts[i].postImage}`;
        }
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(paramsId => {
            this.username = paramsId.username;
        })
        this.authorservice.getUserByUsername(this.username).subscribe(data => {
            this.author = data.user;
            this.getProfileImageURL(this.author)
            this.authorDataLoaded = true;
            this.authorservice.getPostsCreatedByAuthor(JSON.stringify(data.user._id)).subscribe(data => {
//                this.posts = data.data;
//                this.arrGetPostImageURL(this.posts);
//                this.postsDataLoaded = true;
            })
            
        })
    }

}