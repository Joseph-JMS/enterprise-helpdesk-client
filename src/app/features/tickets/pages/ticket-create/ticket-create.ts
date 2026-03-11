import { Component, inject, OnInit, signal } from '@angular/core';
import { TicketService } from '../../../../core/services/ticket.service';
import { CategoryService } from '../../../../core/services/category.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryResponse } from '../../../../core/interfaces/category.interface';
import { TicketRequest } from '../../../../core/interfaces/ticket.interface';

@Component({
  selector: 'app-ticket-create',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './ticket-create.html',
})
export class TicketCreate implements OnInit{

  private readonly ticketService = inject(TicketService);
  private readonly categoryService = inject(CategoryService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  categories = signal<CategoryResponse[]>([]);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);

  ticketForm = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(150)]],
    description: ['', [Validators.required]],
    priority: ['', [Validators.required]],
    categoryId: [null, [Validators.required]],
  });

  ngOnInit(): void {
    this.categoryService.getEnabledCategories().subscribe({
      next: (data) => this.categories.set(data),
      error: () => this.errorMessage.set('Error al cargar las categorias'),
    });
  }

  onSubmit() {
    if (this.ticketForm.invalid) {
      this.ticketForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const val = this.ticketForm.value;
    
    const data: TicketRequest = {
      title: val.title || '',
      description: val.description || '',
      priority: val.priority || '',
      categoryId: val.categoryId!
    }

    this.ticketService.create(data).subscribe({
      next: (ticket) => {
        this.router.navigate(['/tickets']);
      },
      error: (err) => {
        this.errorMessage.set(err.error?.detail ?? 'Error al crear el ticket');
        this.isLoading.set(false);
      }
    });

  }

}
