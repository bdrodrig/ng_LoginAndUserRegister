import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { UserRequest } from "../interfaces/user.interface";
import { catchError, throwError } from "rxjs";

@Injectable({providedIn: 'root'})
export class UserService {
  private http = inject(HttpClient);
  private apiUrlRegister = 'http://localhost:8080/api/users/register';

  isLoading = signal(false);

  register(user: UserRequest){
    this.isLoading.set(true);
    return this.http.post(this.apiUrlRegister, user).pipe(
      catchError((error: HttpErrorResponse)=>{
        this.isLoading.set(false);
        return throwError(()=> error);
      })
    );
  }
}
