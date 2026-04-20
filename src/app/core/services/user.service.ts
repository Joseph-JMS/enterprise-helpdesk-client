import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { PageResponse } from '../interfaces/page.interface';
import { CreateUserRequest, UpdateUserRequest, UserResponse } from '../interfaces/user.interface';

@Injectable({providedIn: 'root'})
export class UserService {
    
    private readonly http = inject(HttpClient);
    private readonly API_URL = `${environment.baseUrl}/users`;

    getAll(page: number = 0, size: number = 10): Observable<PageResponse<UserResponse>> {
        return this.http.get<PageResponse<UserResponse>>(this.API_URL, {
        params: { page, size }
        });
    }

    getById(id: number): Observable<UserResponse> {
        return this.http.get<UserResponse>(`${this.API_URL}/${id}`);
    }

    getByRole(roleName: string, page: number = 0, size: number = 10): Observable<PageResponse<UserResponse>> {
        return this.http.get<PageResponse<UserResponse>>(`${this.API_URL}/by-role`, {
        params: { roleName, page, size }
        });
    }

    create(request: CreateUserRequest): Observable<UserResponse> {
        return this.http.post<UserResponse>(this.API_URL, request);
    }

    update(id: number, request: UpdateUserRequest): Observable<UserResponse> {
        return this.http.put<UserResponse>(`${this.API_URL}/${id}`, request);
    }

    toggle(id: number): Observable<UserResponse> {
        return this.http.patch<UserResponse>(`${this.API_URL}/${id}/toggle`, null);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.API_URL}/${id}`);
    }
    
}