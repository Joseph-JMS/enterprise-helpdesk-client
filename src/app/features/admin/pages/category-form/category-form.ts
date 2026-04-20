import { Component, inject, signal } from '@angular/core';
import { CategoryService } from '../../../../core/services/category.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryRequest } from '../../../../core/interfaces/category.interface';

@Component({
  selector: 'app-category-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './category-form.html',
})
export class CategoryForm {

  private readonly categoryService = inject(CategoryService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);

  isEditMode = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  categoryId = signal<number | null>(null);

  categoryForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', [Validators.maxLength(255)]],
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.categoryId.set(Number(id));
      this.loadCategory(Number(id));
    }
  }

  loadCategory(id: number) {
    this.isLoading.set(true);
    this.categoryService.getById(id).subscribe({
      next: (data) => {
        this.categoryForm.patchValue({
          name: data.name,
          description: data.description
        });
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Error al cargar la categoría');
        this.isLoading.set(false);
      }
    });
  }

  onSubmit() {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const val = this.categoryForm.value;
    const request: CategoryRequest = {
      name: val.name!,
      description: val.description ?? ''
    };

    if (this.isEditMode()) {
      this.categoryService.update(this.categoryId()!, request).subscribe({
        next: () => this.router.navigate(['/admin/categories']),
        error: (err) => {
          this.errorMessage.set(err.error?.detail ?? 'Error al actualizar la categoría');
          this.isLoading.set(false);
        }
      });
    } else {
      this.categoryService.create(request).subscribe({
        next: () => this.router.navigate(['/admin/categories']),
        error: (err) => {
          this.errorMessage.set(err.error?.detail ?? 'Error al crear la categoría');
          this.isLoading.set(false);
        }
      });
    }
  }

}
