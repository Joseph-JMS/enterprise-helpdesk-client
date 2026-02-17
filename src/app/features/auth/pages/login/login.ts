import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../../../core/services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginResponse } from '../../../../core/interfaces/auth.interface';

@Component({
  selector: 'auth-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
})
export class Login {

  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const val = this.loginForm.value;

      const data = {
        username: val.username || '',
        password: val.password || '',
      };

      this.authService.login(data).subscribe({
        next: (res) => {
          // Lógica de redirección inteligente basada en tus carpetas
          // if (res.roles.includes('ROLE_ADMIN')) {
          //   this.router.navigate(['/admin']);
          // } else if (res.roles.includes('ROLE_TECHNICIAN')) {
          //   this.router.navigate(['/technician']);
          // } else {
          //   this.router.navigate(['/user']);
          // }
        }
      });
    }
}



}
