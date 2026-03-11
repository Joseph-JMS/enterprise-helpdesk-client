import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { AverageResolutionResponse, CategoryReportResponse, PriorityReportResponse, SlaReportResponse, SummaryResponse, TechnicianReportResponse } from '../interfaces/report.interface';

@Injectable({providedIn: 'root'})
export class ReportService {
    
    private readonly http = inject(HttpClient);
    private readonly API_URL = `${environment.baseUrl}/reports`;

    getSummary(): Observable<SummaryResponse> {
        return this.http.get<SummaryResponse>(`${this.API_URL}/summary`);
    }

    getByCategory(): Observable<CategoryReportResponse[]> {
        return this.http.get<CategoryReportResponse[]>(`${this.API_URL}/by-category`);
    }

    getByTechnician(): Observable<TechnicianReportResponse[]> {
        return this.http.get<TechnicianReportResponse[]>(`${this.API_URL}/by-technician`);
    }

    getByPriority(): Observable<PriorityReportResponse[]> {
        return this.http.get<PriorityReportResponse[]>(`${this.API_URL}/by-priority`);
    }

    getAverageResolutionTime(): Observable<AverageResolutionResponse[]> {
        return this.http.get<AverageResolutionResponse[]>(`${this.API_URL}/average-resolution-time`);
    }

    getSla(): Observable<SlaReportResponse[]> {
        return this.http.get<SlaReportResponse[]>(`${this.API_URL}/sla`);
    }

    getMyPerformance(): Observable<TechnicianReportResponse> {
        return this.http.get<TechnicianReportResponse>(`${this.API_URL}/my-performance`);
    }

    getMySla(): Observable<SlaReportResponse[]> {
        return this.http.get<SlaReportResponse[]>(`${this.API_URL}/my-sla`);
    }
    
}