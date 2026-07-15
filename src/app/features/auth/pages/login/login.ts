import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { AuthService } from '../../../../core/services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'auth-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
})
export class Login {

  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);
  isLoading = signal<boolean>(false);

  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  ngOnInit() {
    if (this.route.snapshot.queryParams['registered']) {
      this.successMessage.set('Registro exitoso. ya puede iniciar sesion.');
    }
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const val = this.loginForm.value;

    const data = {
      username: val.username || '',
      password: val.password || '',
    };

    this.authService.login(data).subscribe({
      next: (res) => {
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        if (returnUrl?.startsWith('/')) {
          this.router.navigateByUrl(returnUrl);
        } else {
          this.router.navigate(['/dashboard'])
        }
      },
      error: (err) => {
        this.errorMessage.set(err.error?.detail ?? 'Credenciales incorrectas. Intentelo de nuevo.');
        this.isLoading.set(false);
      }
    });
  }

}
