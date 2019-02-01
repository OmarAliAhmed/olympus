import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable({
    providedIn: 'root'
})
export class AuthorService {

    constructor(private http: Http) {}

    authToken;
    
    getPostsCreatedByAuthor(id) {
        this.loadToken();
        let headers = new Headers();
        headers.append('Authorization', this.authToken);
        return this.http.get(environment.host + `/api/posts/authorposts/${id}`, {
            headers
        }).map(data => data.json())
    }

    getPostCreator(id) {
        this.loadToken();
        let headers = new Headers();
        headers.append('Authorization', this.authToken);
        return this.http.get(environment.host + `/api/posts/author/${id}`, {
            headers
        }).map(data => data.json())
    }

    getUserById(id) {
        this.loadToken();
        let headers = new Headers();
        headers.append('Authorization', this.authToken)
        return this.http.get(environment.host + `/api/users/id/${id}`, {
            headers
        }).map(data => data.json());
    }
    getUserByUsername(username) {
        this.loadToken();
        let headers = new Headers();
        headers.append('Authorization', this.authToken)
        return this.http.get(environment.host + `/api/users/username/${username}`, {
            headers
        }).map(data => data.json());
    }

    loadToken() {
        const token = localStorage.getItem('id_token');
        this.authToken = token;
    }
}