import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UpdateProfileRequest } from '../../../../core/interfaces/user.interface';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-edit-profile',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './edit-profile.html',
})
export class EditProfile {
  private readonly userService = inject(UserService);
  private readonly fb = inject(FormBuilder);

  isLoading = signal<boolean>(true);
  isSaving = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  profileForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
  });

  ngOnInit() {
    this.userService.getMe().subscribe({
      next: (data) => {
        this.profileForm.patchValue({
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
        });
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Error al cargar el perfil');
        this.isLoading.set(false);
      }
    });
  }

  onSubmit() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.isSaving.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    const val = this.profileForm.value;
    const request: UpdateProfileRequest = {
      email: val.email!,
      firstName: val.firstName!,
      lastName: val.lastName!,
    };

    this.userService.updateProfile(request).subscribe({
      next: () => {
        this.successMessage.set('Perfil actualizado correctamente');
        this.isSaving.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err.error?.detail ?? 'Error al actualizar el perfil');
        this.isSaving.set(false);
      }
    });
  }
}
