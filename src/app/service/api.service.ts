import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:5000'; //à remplir

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer un message depuis le backend
  getMessage(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/message`);
  }

  getAllvendeur(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/vendeur`);
  }


}
