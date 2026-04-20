import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { Router } from '@angular/router';
import { UserResponse } from '../../../../core/interfaces/user.interface';
import { Pagination } from "../../../../shared/components/pagination/pagination";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-management',
  imports: [Pagination, DatePipe],
  templateUrl: './user-management.html',
})
export class UserManagement {

  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  users = signal<UserResponse[]>([]);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string | null>(null);
  currentPage = signal<number>(0);
  totalPages = signal<number>(0);
  totalElements = signal<number>(0);
  pageSize = 10;

  ngOnInit() {
    this.loadUsers();
  }

    loadUsers(page: number = 0) {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.userService.getAll(page, this.pageSize).subscribe({
      next: (data) => {
        this.users.set(data.content);
        this.currentPage.set(data.page.number);
        this.totalPages.set(data.page.totalPages);
        this.totalElements.set(data.page.totalElements);
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Error al cargar los usuarios');
        this.isLoading.set(false);
      }
    });
  }

  goToPage(page: number) {
    if (page >= 0 && page < this.totalPages()) {
      this.loadUsers(page);
    }
  }

  toggleUser(id: number) {
    this.userService.toggle(id).subscribe({
      next: (updated) => {
        this.users.update(list =>
          list.map(u => u.id === updated.id ? updated : u)
        );
      },
      error: () => this.errorMessage.set('Error al cambiar el estado del usuario')
    });
  }

  goToCreate() {
    this.router.navigate(['/admin/users/new']);
  }

  goToEdit(id: number) {
    this.router.navigate(['/admin/users/edit', id]);
  }

}
