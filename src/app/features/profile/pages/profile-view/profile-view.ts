import { Component, inject, signal } from '@angular/core';
import { UserResponse } from '../../../../core/interfaces/user.interface';
import { UserService } from '../../../../core/services/user.service';
import { DatePipe } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-profile-view',
  imports: [DatePipe, RouterLink],
  templateUrl: './profile-view.html',
})
export class ProfileView {
  private readonly userService = inject(UserService);

  user = signal<UserResponse | null>(null);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string | null>(null);

  ngOnInit() {
    this.userService.getMe().subscribe({
      next: (data) => {
        this.user.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Error al cargar el perfil');
        this.isLoading.set(false);
      }
    });
  }
}
