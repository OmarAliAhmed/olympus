import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import {CreatePostService} from '../../services/create-post.service';
import {Router} from '@angular/router';






@Component({
    selector: 'app-create-post',
    templateUrl: './create-post.component.html',
    styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

    categories = ['Art and Culture', 'Politics', 'Technology', 'Opinion'];

    content;
    postImage;
    category;
    title;


    constructor(private service: CreatePostService, private router: Router) {}


    ngOnInit() {}

    getFormData(object) {
        const formData = new FormData();
        Object.keys(object).forEach(key => formData.append(key, object[key]));
        return formData;
    }

    onSubmit() {
        let content = document.querySelector('.ql-editor').innerHTML,
            postImageSelector: any =  document.querySelector('#postImage'),
            postImage = postImageSelector.files[0];

        let Post: any = {
            content,
            category: this.category,
            title: this.title,
            postImage
        }
        
        Post = this.getFormData(Post);

        this.service.createpost(Post).subscribe(data => {
            if (data.success) {
                this.router.navigate([''])
            } else {
                console.log(data.msg)
            }
        })
    }


}