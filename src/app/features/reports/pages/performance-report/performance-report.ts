import { Component, inject, signal } from '@angular/core';
import { ReportService } from '../../../../core/services/report.service';
import { AuthService } from '../../../../core/services/auth.service';
import { TechnicianReportResponse } from '../../../../core/interfaces/report.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-performance-report',
  imports: [DecimalPipe],
  templateUrl: './performance-report.html',
})
export class PerformanceReport {
  private readonly reportService = inject(ReportService);
  private readonly authService = inject(AuthService);

  readonly isAdmin = this.authService.isAdmin;

  technicians = signal<TechnicianReportResponse[]>([]);
  myPerformance = signal<TechnicianReportResponse | null>(null);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string | null>(null);

  ngOnInit() {
    if (this.isAdmin()) {
      this.reportService.getByTechnician().subscribe({
        next: (data) => {
          this.technicians.set(data);
          this.isLoading.set(false);
        },
        error: () => {
          this.errorMessage.set('Error al cargar el reporte');
          this.isLoading.set(false);
        }
      });
    } else {
      this.reportService.getMyPerformance().subscribe({
        next: (data) => {
          this.myPerformance.set(data);
          this.isLoading.set(false);
        },
        error: () => {
          this.errorMessage.set('Error al cargar tu rendimiento');
          this.isLoading.set(false);
        }
      });
    }
  }
}
