import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';


@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(private http: Http) {}
    
    authToken;
    user;

    loginUser(user) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(environment.host + "/api/users/login", user, {
            headers: headers
        }).map(data => data.json())
    }

    loadToken() {
        const token = localStorage.getItem('id_token');
        this.authToken = token;
    }

    loggedIn() {
        return tokenNotExpired('id_token');
    }

    logout() {
        this.authToken = null;
        this.user = null;
        localStorage.clear();
    }
    storeUserData(token, user) {
        localStorage.setItem('id_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.authToken = token;
        this.user = user;
    }
}