import { Component } from '@angular/core';
import { CustomService } from 'src/app/core/service/custom.service';
import { Ethnicity } from 'src/app/shared/interfaces/ethnicity.type';
import { FoodAndDrinks } from 'src/app/shared/interfaces/food-and-drinks.type';
import { GoingOut } from 'src/app/shared/interfaces/going-out.type';
import { Hobby } from 'src/app/shared/interfaces/hobby.type';
import { Profession } from 'src/app/shared/interfaces/profession.type';
import { User } from 'src/app/shared/interfaces/user.type';
import { Zodiac } from 'src/app/shared/interfaces/zodiac.type';
import { User as Usermpdel } from 'src/app/shared/models/user.model';
import * as moment from 'moment';
import { AuthService } from 'src/app/core/service/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  ethinicities: Ethnicity[] = [];
  zodiacs: Zodiac[] = [];
  professions: Profession[] = [];
  foodAndDrinks: FoodAndDrinks[] = [];
  goingOuts: GoingOut[] = [];
  hobbies: Hobby[] = [];
  userData: User = new Usermpdel({});

  isLoading: boolean = false;
  otpVeriffication: boolean = false;

  otpData = {
    otp: "",
    otptoken: ""
  };

  constructor(private service: CustomService, private authServivce: AuthService, private router: Router) { }

  ngOnInit() {
    this.service.getProfessions().subscribe((res: Profession[]) => {
      console.log(res);
    });

    this.service.getZodiacs().subscribe((res: Zodiac[]) => {
      this.zodiacs = res;
    });

    this.service.getEthinicities().subscribe((res: Ethnicity[]) => {
      this.ethinicities = res;
    });

    this.service.getFoodAndDrinks().subscribe((res: FoodAndDrinks[]) => {
      this.foodAndDrinks = res;
    });

    this.service.getHobbies().subscribe((res: Hobby[]) => {
      this.hobbies = res;
    });

    this.service.getGoingOuts().subscribe((res: GoingOut[]) => {
      this.goingOuts = res;
    });
  }

  GetUserData(form: NgForm) {
    form.form.markAllAsTouched();
    if (form.form.valid) {
      this.isLoading = true;
      console.log(moment(this.userData.dob).format('YYYY-MM-DD'));
      this.userData.dob = moment(this.userData.dob).format('YYYY-MM-DD');
      this.userData.ethicity = this.ethinicities.filter(e => e.checked).map(x => x.id ?? 0);
      this.userData.food_preference = this.foodAndDrinks.filter(e => e.checked).map(x => x.id ?? 0);
      this.userData.goingout_preference = this.goingOuts.filter(e => e.checked).map(x => x.id ?? 0);
      console.log(this.userData);
      this.authServivce.registerUser(this.userData).subscribe((data: any) => {
        console.log(data);
        setTimeout(() => {
          this.isLoading = false;
          if (data.otpToken) {
            this.otpData.otptoken = data.otpToken;
            this.otpVeriffication = true;
          }
        }, 1000);
      });
    }
  }

  obj2FormData(obj: any, form?: any, namespace?: any) {
    var fd = form || new FormData();
    var formKey;

    for (var property in obj) {
      if (obj.hasOwnProperty(property) && obj[property]) {
        if (namespace) {
          formKey = namespace + "[" + property + "]";
        } else {
          formKey = property;
        }

        // if the property is an object, but not a File,
        // use recursivity.
        if (
          typeof obj[property] === "object" &&
          !(obj[property] instanceof File)
        ) {
          this.obj2FormData(obj[property], fd, formKey);
        } else {
          // if it's a string or a File object
          fd.append(formKey, obj[property]);
        }
      }
    }

    return fd;
  }

  handleFileInput(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    this.userData.image = fileList?.item(0) || null;
    console.log(this.obj2FormData(this.userData));

  }

  Allowonly18Plus(): string {
    return moment().subtract(18, 'years').format('YYYY-MM-DD');
  }

  VerifyOtp() {
    console.log(this.otpData);

    this.authServivce.verifyOTP(this.otpData).subscribe((data) => {
      if (data['verified']) {
        this.router.navigate(['/login'])
      }
    })
  }
}
