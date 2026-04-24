import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { Login } from "../pages/login/login";
import { tap } from "rxjs";
import { UserRequest, LoginRequest} from "../interfaces/user.interface";

@Injectable({providedIn: 'root'})

export class AuthService {
  private http = inject(HttpClient);
  private apiUrlLogin = 'http://localhost:8080/api/users/login';

  currentUser = signal<UserRequest | null>(null);

  login(credentials: LoginRequest){
    return this.http.post<UserRequest>(this.apiUrlLogin, credentials).pipe(
      tap(response =>{ this.currentUser.set(response); }),
    )
  }

  logout(){
    this.currentUser.set(null);
  }
}
