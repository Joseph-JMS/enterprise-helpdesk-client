import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChangePasswordRequest } from '../../../../core/interfaces/user.interface';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './change-password.html',
})
export class ChangePassword {
  private readonly userService = inject(UserService);
  private readonly fb = inject(FormBuilder);

  isSaving = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  passwordForm = this.fb.group({
    currentPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
  }, { validators: this.passwordMatchValidator });

  passwordMatchValidator(form: AbstractControl) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    }
    return null;
  }

  onSubmit() {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    this.isSaving.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    const val = this.passwordForm.value;
    const request: ChangePasswordRequest = {
      currentPassword: val.currentPassword!,
      newPassword: val.newPassword!,
      confirmPassword: val.confirmPassword!,
    };

    this.userService.changePassword(request).subscribe({
      next: () => {
        this.successMessage.set('Contraseña actualizada correctamente');
        this.passwordForm.reset();
        this.isSaving.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err.error?.detail ?? 'Error al cambiar la contraseña');
        this.isSaving.set(false);
      }
    });
  }
}
