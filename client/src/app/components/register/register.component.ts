import {Component, OnInit} from '@angular/core';
import {RegisterService} from '../../services/register.service';
import {Router} from '@angular/router';



@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    constructor(private registerservice: RegisterService, private router: Router) {}
    User = {};
    imagePath;
    imgURL;

    ngOnInit() {}

    readImage(files) {
        if (files.length === 0) {
            document.querySelector(".register-input-file-label").style.backgroundImage = `url(../../../assets/profile-image-field.png)`
            return;
        }

        var mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            return;
        }

        var reader = new FileReader();
        this.imagePath = files;
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
            this.imgURL = reader.result;
            let imageSelector: any =  document.querySelector(".register-input-file-label");
            imageSelector.style.backgroundImage = `url(${this.imgURL})`;
        }
    }

    onRegisterSubmit() {
        console.log(this.User)
        let formData = new FormData();

        for (var key in this.User) {
            formData.append(key, this.User[key]);
        }
        let fileSelector: any = document.querySelector("#profileImage"),
            file: any = fileSelector.files[0]
        formData.append('profileImage', file)


        this.registerservice.registerUser(formData).subscribe((data) => {
            if (data.success) {
                this.router.navigate([''])
            } else {
                console.log(data.msg)
            }
        })
    }
}