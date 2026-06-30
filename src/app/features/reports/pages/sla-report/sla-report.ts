import { Component, inject, signal } from '@angular/core';
import { ReportService } from '../../../../core/services/report.service';
import { AuthService } from '../../../../core/services/auth.service';
import { SlaReportResponse } from '../../../../core/interfaces/report.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-sla-report',
  imports: [DecimalPipe],
  templateUrl: './sla-report.html',
})
export class SlaReport {
  private readonly reportService = inject(ReportService);
  private readonly authService = inject(AuthService);

  readonly isAdmin = this.authService.isAdmin;

  slaData = signal<SlaReportResponse[]>([]);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string | null>(null);

  ngOnInit() {
    const request$ = this.isAdmin()
      ? this.reportService.getSla()
      : this.reportService.getMySla();

    request$.subscribe({
      next: (data) => {
        this.slaData.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Error al cargar el reporte SLA');
        this.isLoading.set(false);
      }
    });
  }
}
