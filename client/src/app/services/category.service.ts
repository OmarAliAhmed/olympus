import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(private http: Http) {}

    authToken;

    loadToken() {
        const token = localStorage.getItem('id_token');
        this.authToken = token;
    }
    
    getCategoryPosts(category) {
        this.loadToken();
        let headers = new Headers();
        headers.append('Authorization', this.authToken)
        return this.http.get(`${environment.host}/api/posts/category/${category}`,{headers}).map(data => data.json());
    }
}