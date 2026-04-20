import { Component, inject, signal } from '@angular/core';
import { CategoryService } from '../../../../core/services/category.service';
import { Router } from '@angular/router';
import { CategoryResponse } from '../../../../core/interfaces/category.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-category-management',
  imports: [DatePipe],
  templateUrl: './category-management.html',
})
export class CategoryManagement {

  private readonly categoryService = inject(CategoryService);
  private readonly router = inject(Router);

  categories = signal<CategoryResponse[]>([]);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string | null>(null);

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Error al cargar las categorías');
        this.isLoading.set(false);
      }
    });
  }

  toggleCategory(id: number) {
    this.categoryService.toggle(id).subscribe({
      next: (updated) => {
        this.categories.update(list =>
          list.map(c => c.id === updated.id ? updated : c)
        );
      },
      error: () => this.errorMessage.set('Error al cambiar el estado de la categoría')
    });
  }

  goToCreate() {
    this.router.navigate(['/admin/categories/create']);
  }

  goToEdit(id: number) {
    this.router.navigate(['/admin/categories/edit', id]);
  }
}
