import { Inject, Injectable, PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl + '/gestionnaire';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(
    this.hasToken()
  );

  constructor(private http: HttpClient, private router: Router, @Inject(PLATFORM_ID) private platformId: any) {}

  // Vérifie si un token existe dans localStorage
  hasToken(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }
    return !!localStorage.getItem('token');
  }
  // Observable pour l'état de connexion
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  // Méthode pour se connecter
  login(pseudo: string, mot_de_passe: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, {
      pseudo,
      mot_de_passe,
    }, 
    { headers } );
  }

  // Stocke le token et met à jour l'état de connexion
  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.isAuthenticatedSubject.next(true);
  }

  // Déconnexion
  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  // Retourne le token stocké
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}