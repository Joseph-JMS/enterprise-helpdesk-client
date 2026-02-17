import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LoginResponse, RegisterRequest } from '../interfaces/auth.interface';
import { Observable, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {
    
    private http = inject(HttpClient);
    private API_URL = `${environment.baseUrl}/auth`;

    // Signal para manejar el estado del usuario de forma reactiva
    #authState = signal<LoginResponse | null>(null);

    // Exponemos signals de lectura
    currentUser = computed(() => this.#authState());
    isLoggedIn = computed(() => !!this.#authState());

    constructor() {
        this.checkToken();
    }

    private checkToken() {
        const token = localStorage.getItem('token');
        if (token) {
        // Decodificamos el payload para recuperar roles y username sin pegarle al back
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.#authState.set({
            token,
            username: payload.sub,
            roles: payload.authorities // Asegúrate que coincida con el claim de Java
        });
        }
    }

    login(credentials: {username: string, password: string}): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.API_URL}/login`, credentials).pipe(
            tap(res => {
                localStorage.setItem('token', res.token);

                const payload = JSON.parse(atob(res.token.split('.')[1]));

                this.#authState.set({
                    token: res.token,
                    username: res.username,
                    roles: payload.authorities,
                });
            })
        );
    }

    register(data: RegisterRequest) {
        return this.http.post(`${this.API_URL}/register`, data);
    }

    logout() {
        localStorage.removeItem('token');
        this.#authState.set(null);
        window.location.href = '/auth/login'; // Recarga para limpiar estados de memoria
    }

    getUserRoles(): string[] {
        return this.#authState()?.roles || [];
    }
    
}