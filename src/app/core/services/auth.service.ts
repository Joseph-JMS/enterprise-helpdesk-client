import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LoginResponse, RegisterRequest } from '../interfaces/auth.interface';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthService {
    
    private http = inject(HttpClient);
    private router = inject(Router);
    private readonly API_URL = `${environment.baseUrl}/auth`;

    // manejo del estado del usuario de forma reactiva
    #authState = signal<LoginResponse | null>(null);

    currentUser = computed(() => this.#authState());
    isLoggedIn = computed(() => !!this.#authState());

    constructor() {
        this.checkToken();
    }

    private checkToken() {
        const token = localStorage.getItem('token');
        if (!token) return;
        
        const data = this.decodeToken(token);
        if (data) {
            this.#authState.set(data);
        } else {
            this.logout();
        }
    }

    login(credentials: {username: string, password: string}): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.API_URL}/login`, credentials).pipe(
            tap(res => {
                localStorage.setItem('token', res.token);
                const decoded = this.decodeToken(res.token);
                this.#authState.set(decoded);
            })
        );
    }

    register(data: RegisterRequest) {
        return this.http.post(`${this.API_URL}/register`, data);
    }

    logout() {
        localStorage.removeItem('token');
        this.#authState.set(null);
        this.router.navigate(['/auth/login']);
    }

    getUserRoles(): string[] {
        return this.#authState()?.roles || [];
    }

    hasRole(role: string): boolean {
        const user = this.currentUser();
        return user ? user.roles.includes(role) : false;
    }

    private decodeToken(token: string): LoginResponse|null {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const roles = (payload.authorities as string[]).filter(r => r.startsWith('ROLE_'));

            return {
                token,
                username: payload.sub,
                roles: roles
            };
        } catch (e) {
            console.error('Error decodificando el token', e);
            return null;
        }
    }
    
}