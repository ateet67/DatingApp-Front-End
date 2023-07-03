import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { HttpClientModule } from "@angular/common/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { PasswordPatternDirective } from './core/directives/password-pattern.directive';
import { MatchPasswordDirective } from './core/directives/match-password.directive';
import { ValidateUserNameDirective } from './core/directives/validate-user-name.directive';
import { AlphabetsOnlyDirective } from './core/directives/alphabets-only.directive';
import { AlphNumericDirective } from './core/directives/alph-numeric.directive';
import { CountryCodeDirective } from './core/directives/country-code.directive';
import { NumbersOnlyDirective } from './core/directives/numbers-only.directive';
import { JwtModule } from '@auth0/angular-jwt';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './core/store/reducers/user.reducers';

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PasswordPatternDirective,
    MatchPasswordDirective,
    ValidateUserNameDirective,
    AlphabetsOnlyDirective,
    AlphNumericDirective,
    CountryCodeDirective,
    NumbersOnlyDirective,
    DashboardComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      },
    }),
    StoreModule.forRoot({ user: userReducer }, {})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
