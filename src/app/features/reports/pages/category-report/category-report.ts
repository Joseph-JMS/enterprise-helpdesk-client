import { Component, computed, inject, signal } from '@angular/core';
import { CategoryReportResponse } from '../../../../core/interfaces/report.interface';
import { ReportService } from '../../../../core/services/report.service';

@Component({
  selector: 'app-category-report',
  imports: [],
  templateUrl: './category-report.html',
})
export class CategoryReport {
  private readonly reportService = inject(ReportService);

  categories = signal<CategoryReportResponse[]>([]);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string | null>(null);

  maxTickets = computed(() =>
  Math.max(...this.categories().map(c => c.totalTickets), 1)
);

  ngOnInit() {
    this.reportService.getByCategory().subscribe({
      next: (data) => {
        this.categories.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Error al cargar el reporte');
        this.isLoading.set(false);
      }
    });
  }
}
