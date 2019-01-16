import { Component, OnInit } from '@angular/core';
import {PostService} from '../../services/post.service';
import {AuthorService} from '../../services/author.service';
import {Router, ActivatedRoute} from '@angular/router';
import {environment} from '../../../environments/environment';


@Component({
    selector: 'app-post-author',
    templateUrl: './post-author.component.html',
    styleUrls: ['./post-author.component.scss']
})
export class PostAuthorComponent implements OnInit {

    constructor(private activatedRoute: ActivatedRoute, private authorservice: AuthorService) {}

    author;
    ifAuthorLoaded = false;
    id;

    getProfileImageURL(author) {
        author.profileImage = `${environment.host}/${author.profileImage}`;
    }

    ngOnInit() {
        // Getting post data
        this.activatedRoute.params.subscribe(paramsId => {
            this.id = paramsId.id;
        })

        this.authorservice.getPostCreator(this.id).subscribe((author) => {
            this.authorservice.getUserById(author.data).subscribe((data) => {
                this.author = data.user;
                this.getProfileImageURL(this.author);
                this.ifAuthorLoaded = true;
            })
        })

    }

}