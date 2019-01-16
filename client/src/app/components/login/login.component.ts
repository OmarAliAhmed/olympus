import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service'
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(private authservice: AuthenticationService, private router: Router) {}

    ngOnInit() {}

    username;
    password;
    
onLoginSubmit() {

    const user = {
        username: this.username,
        password: this.password
    }
    this.authservice.loginUser(user).subscribe(data => {
        if (data.success) {
            this.authservice.storeUserData(data.token, data.user);
            this.router.navigate(['']);
        } else {
            console.log(data.msg)
        }
    })
}
}