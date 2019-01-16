import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable({
  providedIn: 'root'
})

export class RegisterService {

  constructor(private http: Http) { }
    
    registerUser(user) {
        let headers = new Headers();
        headers.append("Accept", "application/json")    
        return this.http.post(environment.host + "/api/users/register", user, {headers}).map(data => data.json());
    }
}
 