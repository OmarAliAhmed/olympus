import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthorService} from '../../services/author.service';
import {environment} from '../../../environments/environment';




@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

    constructor(private activatedRoute: ActivatedRoute, private categoryservice: CategoryService, private authorservice: AuthorService) {}
    
    category;
    posts;
    ifPostsLoaded = false;

// This function changes the relative path of the image to an absolute one according to the host from environment of an array of posts
    arrGetPostImageURL(posts) {
        for (let i = 0; i < posts.length; i++) {
            posts[i].postImage = `${environment.host}/${posts[i].postImage}`;
        }
    }

    ngOnInit() {
        //Get the category from the URL of the page 
        this.activatedRoute.params.subscribe(paramsId => {
            this.category = paramsId.category;
        })
        
        //Get the category posts according to the entered category from URL
        this.categoryservice.getCategoryPosts(this.category).subscribe(posts => {
            if(posts.success) {
            this.posts = posts.data;
            this.arrGetPostImageURL(this.posts)
            this.ifPostsLoaded = true;

            }
        })

    }

}