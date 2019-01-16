import {
    Component,
    OnInit
} from '@angular/core';
import {
    RegisterService
} from '../../services/register.service';
import {
    Router
} from '@angular/router';



@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    constructor(private registerservice: RegisterService, private router: Router) {}
    User = {};

    ngOnInit() {}


    onRegisterSubmit() {
        console.log(this.User)
        let formData = new FormData();

        for (var key in this.User) {
            formData.append(key, this.User[key]);
        }
        
        let file:any = document.querySelector("#profileImage").files[0]
        formData.append('profileImage', file )


        this.registerservice.registerUser(formData).subscribe((data) => {
            if (data.success) {
                this.router.navigate([''])
            } else {
                console.log(data.msg)
            }
        })
    }
}