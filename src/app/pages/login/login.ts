import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { validate } from '@angular/forms/signals';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  showPassword = false;

  soloLetras(event: KeyboardEvent){
    const charCode =event.key;
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]$/.test(charCode)) {
      event.preventDefault();
    }
  }

  loginForm = this.fb.nonNullable.group({
    identifier: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]],
    password: ['', [Validators.required]],
  });

  togglePasswordVisibility(){
    this.showPassword = !this.showPassword;
  }

  onsubmit() {
    if (this.loginForm.invalid) return;

    const credentials = this.loginForm.getRawValue();

    this.authService.login(credentials).subscribe({
      next: (user) => {
        this.router.navigate(['/dashboard']);
        console.log(`Bienvenido ${user.username}`);
      },
      error: (err)=>{
        console.error('Error de inicio de sesión:', err);}
    })
  }
}
