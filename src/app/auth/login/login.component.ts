import { Component } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginData = {
    email: "",
    password: ""
  }

  isLoading: boolean = false;

  constructor(private authServivce: AuthService) {

  }


  login(form: NgForm) {
    form.form.markAllAsTouched();
    if (form.form.valid) {
      this.isLoading = true;
      this.authServivce.login(this.loginData.email, this.loginData.password).subscribe(
        (data: any) => {
          this.isLoading = false;
          setTimeout(() => {
            console.log(data);
          }, 1000);
        },
        (err: any) => {
          this.isLoading = false;
          setTimeout(() => {
            console.log(err.error);
          }, 1000);
        })
    }
  }
}
