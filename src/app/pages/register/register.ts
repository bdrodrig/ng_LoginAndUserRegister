import { Component, inject } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { email, validate } from '@angular/forms/signals';

import { UserService } from '../../services/user.service';

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

  registerForm = this.fb.nonNullable.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required]],
    username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })

  sendData(){
    if (this.registerForm.valid) {
      const data = this.registerForm.getRawValue();
      this.userService.register(data).subscribe({
        next: (res) => alert('¡Registro profesional exitoso!'),
        error: (err) => console.error('Error del servidor:', err)
      })
    }
  }
}
