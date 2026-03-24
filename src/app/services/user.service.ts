import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { UserRequest } from "../interfaces/user.interface";

@Injectable({providedIn: 'root'})
export class UserService {
  private http = inject(HttpClient);
  private apiUrlRegister = 'http://localhost:8080/api/users/register';

  isLoading = signal(false);

  register(user: UserRequest){
    this.isLoading.set(true);
    return this.http.post(this.apiUrlRegister, user);
  }
}
