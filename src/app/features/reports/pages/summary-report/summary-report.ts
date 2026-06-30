import { Component, inject, signal } from '@angular/core';
import { ReportService } from '../../../../core/services/report.service';
import { SummaryResponse } from '../../../../core/interfaces/report.interface';

@Component({
  selector: 'app-summary-report',
  imports: [],
  templateUrl: './summary-report.html',
})
export class SummaryReport {
  private readonly reportService = inject(ReportService);

  summary = signal<SummaryResponse | null>(null);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string | null>(null);

  ngOnInit() {
    this.reportService.getSummary().subscribe({
      next: (data) => {
        this.summary.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Error al cargar el resumen');
        this.isLoading.set(false);
      }
    });
  }
}
