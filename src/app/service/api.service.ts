import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  //J'ai mis data pour chaque car vaut mieux voir ensemble comment on envoie les données


  // Acheteur
  createAcheteur(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/acheteur/`, data);
  }

  getAcheteurById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/acheteur/${id}`);
  }

  getAllAcheteurs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/acheteur/`);
  }

  updateAcheteur(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/acheteur/${id}`, data);
  }

  deleteAcheteur(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/acheteur/${id}`);
  }

  // Categorie 
  createCategorie(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/categorie`, data);
  }

  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/categorie`);
  }

  // Gestionnaire 
  createGestionnaire(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/gestionnaire`, data);
  }

  getGestionnaireById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/gestionnaire/${id}`);
  }

  getAllGestionnaires(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/gestionnaire`);
  }

  updateGestionnaire(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/gestionnaire/${id}`, data);
  }

  deleteGestionnaire(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/gestionnaire/${id}`);
  }

  // Jeu
  createJeu(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/jeu`, data);
  }

  getJeuById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/jeu/${id}`);
  }

  getAllJeux(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/jeu`);
  }

  updateJeu(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/jeu/${id}`, data);
  }

  deleteJeu(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/jeu/${id}`);
  }

  // Transaction
  createTransaction(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/transaction`, data);
  }

  getTransactionById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/transaction/${id}`);
  }

  getAllTransactions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/transaction`);
  }

  getFilteredTransactions(data: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/api/transaction/filtered`, data);
  }

  updateTransaction(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/transaction/${id}`, data);
  }

  deleteTransaction(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/transaction/${id}`);
  }

  // TypeJeu 
  createTypeJeu(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/typeJeu`, data);
  }

  getTypeJeuById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/typeJeu/${id}`);
  }

  getAllTypeJeux(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/typeJeu`);
  }

  updateTypeJeu(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/typeJeu/${id}`, data);
  }

  deleteTypeJeu(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/typeJeu/${id}`);
  }

  // Vendeur
  createVendeur(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/vendeur`, data);
  }

  getVendeurById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/vendeur/${id}`);
  }

  getAllVendeurs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/vendeur`);
  }

  updateVendeur(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/vendeur/${id}`, data);
  }

  deleteVendeur(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/vendeur/${id}`);
  }

  resetSolde(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/vendeur/solde/${id}`, {});
  }
}
