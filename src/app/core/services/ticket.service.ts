import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { PageResponse } from '../interfaces/page.interface';
import { TicketRequest, TicketResponse, TicketStatusHistoryResponse } from '../interfaces/ticket.interface';

@Injectable({providedIn: 'root'})
export class TicketService {
    
    private readonly http = inject(HttpClient);
    private readonly API_URL = `${environment.baseUrl}/tickets`;

    getMyTickets(page: number = 0, size: number = 10): Observable<PageResponse<TicketResponse>> {
        return this.http.get<PageResponse<TicketResponse>>(`${this.API_URL}/my-tickets`, {
            params: { page, size }
        });
    }

    getUnassigned(page: number = 0, size: number = 10): Observable<PageResponse<TicketResponse>> {
        return this.http.get<PageResponse<TicketResponse>>(`${this.API_URL}/unassigned`, {
            params: { page, size }
        });
    }

    getAssigned(page: number = 0, size: number = 10): Observable<PageResponse<TicketResponse>> {
        return this.http.get<PageResponse<TicketResponse>>(`${this.API_URL}/assigned`, {
            params: { page, size }
        });
    }

    getAll(page: number = 0, size: number = 10): Observable<PageResponse<TicketResponse>> {
        return this.http.get<PageResponse<TicketResponse>>(`${this.API_URL}`, {
            params: { page, size }
        });
    }

    getById(id: number): Observable<TicketResponse> {
        return this.http.get<TicketResponse>(`${this.API_URL}/${id}`);
    }
    
    getHistory(id: number): Observable<TicketStatusHistoryResponse[]> {
        return this.http.get<TicketStatusHistoryResponse[]>(`${this.API_URL}/${id}/history`);
    }

    create(request: TicketRequest): Observable<TicketResponse> {
        return this.http.post<TicketResponse>(`${this.API_URL}`, request);
    }

    assign(id: number, assignedUsername?: string): Observable<TicketResponse> {
        const params: any = {};
        if (assignedUsername) params['assignedUsername'] = assignedUsername;
        return this.http.patch<TicketResponse>(`${this.API_URL}/${id}/assign`, null, { params });
    }

    changeStatus(id: number, newStatus: string): Observable<TicketResponse> {
        return this.http.patch<TicketResponse>(`${this.API_URL}/${id}/status`, null, {
            params: { newStatus }
        });
    }

    cancel(id: number): Observable<TicketResponse> {
        return this.http.patch<TicketResponse>(`${this.API_URL}/${id}/cancel`, null);
    }

}