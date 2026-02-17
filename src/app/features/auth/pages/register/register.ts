import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AuthService } from '../../../../core/services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { RegisterRequest } from '../../../../core/interfaces/auth.interface';

@Component({
  selector: 'auth-register',
  imports: [RouterLink],
  templateUrl: './register.html',
})
export class Register {

  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  registerForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
  });

  sendRegister() {
    if (this.registerForm.valid) {
      const val = this.registerForm.value;

      const data: RegisterRequest = {
        username: val.username || '',
        password: val.password || '',
        email: val.email || '',
        firstName: val.firstName || '',
        lastName: val.lastName || '',
      }

      this.authService.register(data).subscribe({
        next: () => alert('Regsitro exitoso'),
        error: (err) => alert('Error en resgitro'),
      });
    }
  }

}
