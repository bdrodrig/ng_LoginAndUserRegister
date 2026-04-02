import { Component, inject } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private fb = inject(FormBuilder);
  userService = inject(UserService);
  isloading = this.userService.isLoading

  showPassword = false;

  togglePasswordVisibility(){
    this.showPassword = !this.showPassword;
  }

  soloLetras(event: KeyboardEvent){
    const charCode =event.key;
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]$/.test(charCode)) {
      event.preventDefault();
    }
  }

  registerForm = this.fb.nonNullable.group({
    firstName: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]],
    lastName: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]],
    username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })

  sendData() {
  if (this.registerForm.valid) {
    const data = this.registerForm.getRawValue();

    this.userService.register(data).subscribe({
      next: () => {
        console.log('Usuario registrado correctamente ✅');
        this.registerForm.reset();
        this.isloading.set(false);
      },
      error: (error: HttpErrorResponse) => {
        const msg = error.status === 409
          ? 'El nombre de usuario o correo ya existe ❌'
          : 'Error al registrar el usuario ❌';

        console.error(msg);
      }
    });
  }
}
}
