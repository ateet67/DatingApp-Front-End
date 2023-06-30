import { Injectable } from '@angular/core';
import { ApiHttpService } from './api-http.service';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/shared/interfaces/user.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api: ApiHttpService;

  constructor(http: HttpClient) {
    this.api = new ApiHttpService(http);
  }

  registerUser(userData: User): Observable<User> {
    return this.api.post("auth/register", userData);
  }

  verifyOTP(otpData: any): Observable<{ [key: string]: boolean }> {
    return this.api.post("auth/verifyotp", otpData);
  }

  login(email: string, password: string): Observable<User> {
    return this.api.post("auth/login", { email, password });
  }
}
