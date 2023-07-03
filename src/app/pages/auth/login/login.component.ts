import { Component } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { Store } from "@ngrx/store";
import { setUser } from 'src/app/core/store/actions/user.actions';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginData = {
    email: "fhghd@sds.dsd",
    password: "Sit@321#"
  }

  isLoading: boolean = false;

  constructor(private authServivce: AuthService, private store: Store, private router: Router) {

  }


  login(form: NgForm) {
    form.form.markAllAsTouched();
    if (form.form.valid) {
      this.isLoading = true;
      this.authServivce.login(this.loginData.email, this.loginData.password).subscribe(
        (data: any) => {
          if (data.status) {
            this.isLoading = false;
            localStorage.setItem("token", data.user.token);
            this.store.dispatch(setUser({ user: data.user }));
            setTimeout(() => {
              console.log(data);
              this.router.navigateByUrl('/dashboard')
            }, 1000);
          }
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
