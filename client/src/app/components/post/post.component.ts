import {Component, OnInit} from '@angular/core';
import {PostService} from '../../services/post.service';
import {AuthorService} from '../../services/author.service';
import {Router, ActivatedRoute} from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

    constructor(private postservice: PostService, private activatedRoute: ActivatedRoute, private authorservice: AuthorService) {}

    id;
    post;
    ifPostLoaded = false;

    getPostImageURL(post) {
        post.postImage = `${environment.host}/${post.postImage}`;
    }
 

    ngOnInit() {
        // Getting post data
        this.activatedRoute.params.subscribe(paramsId => {
            this.id = paramsId.id;
        })
        this.postservice.getPost(this.id).subscribe(post => {
            this.post = post.data;
            document.querySelector(".post-content").innerHTML = this.post.content;
            this.getPostImageURL(this.post)
            this.ifPostLoaded = true;

//            this.authorservice.getUserById(post.data.creator).subscribe(author => {
//                this.author = author;
//                this.getProfileImageURL(this.author)
//                this.ifAuthorLoaded = true;
//            })
        })

    }
}