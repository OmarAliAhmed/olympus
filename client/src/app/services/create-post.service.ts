import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';



@Injectable({
    providedIn: 'root'
})
export class CreatePostService {

    constructor(private http: Http) {}

    authToken;




    createpost(post) {
        this.loadToken();
        let headers = new Headers();
        headers.append('Authorization', this.authToken)
        headers.append("Accept", "application/json")

        return this.http.post(environment.host + '/api/posts/pendingposts', post, {
            headers: headers
        }).map(data => data.json())
    }

    loadToken() {
        const token = localStorage.getItem('id_token');
        this.authToken = token;
    }
}