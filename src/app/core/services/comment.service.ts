import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { CommentRequest, CommentResponse } from '../interfaces/comment.interface';

@Injectable({providedIn: 'root'})
export class ServiceNameService {

    private readonly http = inject(HttpClient);
    private readonly API_URL = `${environment.baseUrl}/tickets`;

    getByTicket(ticketId: number): Observable<CommentResponse[]> {
        return this.http.get<CommentResponse[]>(`${this.API_URL}/${ticketId}/comments`);
    }

    create(ticketId: number, request: CommentRequest): Observable<CommentResponse> {
        return this.http.post<CommentResponse>(`${this.API_URL}/${ticketId}/comments`, request);
    }

    delete(ticketId: number, commentId: number): Observable<void> {
        return this.http.delete<void>(`${this.API_URL}/${ticketId}/comments/${commentId}`);
    }

}