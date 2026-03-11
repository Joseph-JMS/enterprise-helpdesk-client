import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { CategoryRequest, CategoryResponse } from '../interfaces/category.interface';

@Injectable({providedIn: 'root'})
export class CategoryService {
    
    private readonly http = inject(HttpClient);
    private readonly API_URL = `${environment.baseUrl}/categories`;

    getAll(): Observable<CategoryResponse[]> {
        return this.http.get<CategoryResponse[]>(`${this.API_URL}`);
    }

    getEnabledCategories(): Observable<CategoryResponse[]> {
        return this.http.get<CategoryResponse[]>(`${this.API_URL}/enabled`);
    }

    getById(id: number):Observable<CategoryResponse> {
        return this.http.get<CategoryResponse>(`${this.API_URL}/${id}`);
    }

    create(request: CategoryRequest):Observable<CategoryResponse> {
        return this.http.post<CategoryResponse>(`${this.API_URL}`, request);
    }

    update(id: number, request:CategoryRequest): Observable<CategoryResponse> {
        return this.http.put<CategoryResponse>(`${this.API_URL}/${id}`, request);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.API_URL}/${id}`);
    }

    toggle(id: number): Observable<CategoryResponse> {
        return this.http.patch<CategoryResponse>(`${this.API_URL}/${id}/toggle`, null);
    }
    
}