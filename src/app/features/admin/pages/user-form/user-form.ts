import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { CreateUserRequest, UpdateUserRequest } from '../../../../core/interfaces/user.interface';

@Component({
  selector: 'app-user-form',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './user-form.html',
})
export class UserForm {

  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);

  isEditMode = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  userId = signal<number | null>(null);

  userForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    roles: this.fb.group({
      ROLE_ADMIN: [false],
      ROLE_TECHNICIAN: [false],
      ROLE_USER: [false],
    })
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.userId.set(Number(id));
      this.loadUser(Number(id));
      this.userForm.get('username')?.disable();
      this.userForm.get('password')?.disable();
    }
  }

  loadUser(id: number) {
    this.isLoading.set(true);
    this.userService.getById(id).subscribe({
      next: (user) => {
        this.userForm.patchValue({
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          roles: {
            ROLE_ADMIN: user.roles.includes('ROLE_ADMIN'),
            ROLE_TECHNICIAN: user.roles.includes('ROLE_TECHNICIAN'),
            ROLE_USER: user.roles.includes('ROLE_USER'),
          }
        });
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Error al cargar el usuario');
        this.isLoading.set(false);
      }
    });
  }

  getSelectedRoles(): string[] {
    const rolesValue = this.userForm.get('roles')?.value;
    return Object.entries(rolesValue ?? {})
      .filter(([_, selected]) => selected)
      .map(([role]) => role);
  }

  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const roles = this.getSelectedRoles();
    if (roles.length === 0) {
      this.errorMessage.set('Debe seleccionar al menos un rol');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const val = this.userForm.getRawValue();

    if (this.isEditMode()) {
      const request: UpdateUserRequest = {
        email: val.email!,
        firstName: val.firstName!,
        lastName: val.lastName!,
        roles
      };
      this.userService.update(this.userId()!, request).subscribe({
        next: () => this.router.navigate(['/admin/users']),
        error: (err) => {
          this.errorMessage.set(err.error?.detail ?? 'Error al actualizar el usuario');
          this.isLoading.set(false);
        }
      });
    } else {
      const request: CreateUserRequest = {
        username: val.username!,
        password: val.password!,
        email: val.email!,
        firstName: val.firstName!,
        lastName: val.lastName!,
        roles
      };
      this.userService.create(request).subscribe({
        next: () => this.router.navigate(['/admin/users']),
        error: (err) => {
          this.errorMessage.set(err.error?.detail ?? 'Error al crear el usuario');
          this.isLoading.set(false);
        }
      });
    }
  }

}
