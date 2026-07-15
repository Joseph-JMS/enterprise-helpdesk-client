import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthResponse, AuthUser, LoginRequest, RegisterRequest } from '../interfaces/auth.interface';
import { catchError, finalize, firstValueFrom, map, Observable, of, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

export type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

@Injectable({providedIn: 'root'})
export class AuthService {
    
    private readonly http = inject(HttpClient);
    private readonly router = inject(Router);
    private readonly API_URL = `${environment.baseUrl}/auth`;

    #accessToken = signal<string | null>(null);
    #authUser = signal<AuthUser | null>(null);
    #status = signal<AuthStatus>('checking');

    readonly currentUser = this.#authUser.asReadonly();
    readonly accessToken = this.#accessToken.asReadonly();
    readonly authStatus = this.#status.asReadonly();

    readonly isLoggedIn = computed(() => this.#status() === 'authenticated');
    readonly isChecking = computed(() => this.#status() === 'checking');
    readonly isAdmin = computed(() => this.hasRole('ROLE_ADMIN'));
    readonly isTechnician = computed(() => this.hasRole('ROLE_TECHNICIAN'))
    readonly isAdminOrTechnician = computed(() =>
        this.hasAnyRole(['ROLE_ADMIN', 'ROLE_TECHNICIAN'])
    );
    readonly canCreateTickets = computed(() => this.hasRole('ROLE_USER'));

    constructor() {}

    login(credentials: LoginRequest): Observable<void> {
        return this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials, {
            withCredentials: true
        }).pipe(
            tap(response => this.handleSuccess(response)),
            map(() => void 0),
            catchError(error => this.handleError(error))
        );
    }

    register(data: RegisterRequest): Observable<void> {
        return this.http.post<void>(`${this.API_URL}/register`, data).pipe(
            catchError(error => this.handleError(error))
        );
    }

    refresh(): Observable<void> {
        return this.http.post<AuthResponse>(`${this.API_URL}/refresh`, {}, {
            withCredentials: true
        }).pipe(
            tap(response => this.handleSuccess(response)),
            map(() => void 0),
            catchError(error => throwError(() => error))
        );
    }

    logout(): Observable<void> {
        return this.http.post<void>(`${this.API_URL}/logout`, {}, {
            withCredentials: true
        }).pipe(
            finalize(() => {
                this.clearSession();
                this.router.navigate(['/auth/login']);
            }),
            map(() => void 0),
            catchError(() => of(void 0))
        );
    }


    hasRole(role: string): boolean {
        return this.#authUser()?.roles.includes(role) ?? false;
    }

    hasAnyRole(roles: string[]): boolean {
        return roles.some(role => this.hasRole(role));
    }

    isTokenExpired(): boolean {
        const user =  this.#authUser();
        if (!user) return true;
        return new Date() >= user.expiresAt;
    }


    restoreSession(): Promise<void> {
        return firstValueFrom(
            this.refresh().pipe(
                catchError(() => {
                    this.#status.set('not-authenticated');
                    return of(void 0);
                })
            )
        )
    }

    private handleSuccess(response: AuthResponse): void {
        this.#accessToken.set(response.accessToken);
        this.#authUser.set({
            username: response.username,
            roles: response.roles,
            expiresAt: new Date(Date.now() + (response.expiresIn - 30) * 1000)
        });
        this.#status.set('authenticated');
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        if (error.status === 401) {
            this.clearSession();
        }
        return throwError(() => error);
    }

    private clearSession(): void {
        this.#accessToken.set(null);
        this.#authUser.set(null);
        this.#status.set('not-authenticated');
    }
    
}