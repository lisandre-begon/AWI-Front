import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})



export class ApiService {
  private readonly apiUrl = environment.apiUrl;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  //J'ai mis data pour chaque car vaut mieux voir ensemble comment on envoie les données


  
  // Acheteur
  createAcheteur(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/acheteur/`, data);
  }

  getAcheteurById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/acheteur/${id}`);
  }

  getAllAcheteurs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/acheteur/`);
  }

  updateAcheteur(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/acheteur/${id}`, data);
  }

  deleteAcheteur(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/acheteur/${id}`);
  }

  // Categorie 
  createCategorie(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/categorie`, data);
  }

  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categorie`);
  }

  // Gestionnaire 
  createGestionnaire(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/gestionnaire`, data);
  }

  getGestionnaireById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/gestionnaire/${id}`);
  }

  getAllGestionnaires(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/gestionnaire`);
  }

  updateGestionnaire(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/gestionnaire/${id}`, data);
  }

  deleteGestionnaire(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/gestionnaire/${id}`);
  }

  // Jeu
  createJeu(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/jeu`, data);
  }

  getJeuById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/jeu/${id}`);
  }

  getAllJeux(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/jeu`);
  }

  getFilteredJeux(data: any): Observable<any[]> {
    console.log("📤 Envoi de la requête pour les jeux:", data);
    return this.http.post<any[]>(`${this.apiUrl}/jeu/filtered`, data, this.httpOptions).pipe(
        tap(response => console.log("📥 Réponse reçue:", response))
    );
  }



  updateJeu(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/jeu/${id}`, data);
  }

  deleteJeu(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/jeu/${id}`);
  }

  // getFiltredJeu(
  //   proprietaire: String = "", 
  //   prix_min: String = "", 
  //   prix_max: String = "",
  //   categorie: String = "", 
  //   intitule: String = "", 
  //   statut: String = "", 
  //   editeur: String = "",
  //   quantites: String = ""
  // ): Observable<any[]> {
  
  //   // On crée un objet pour les filtres à envoyer
  //   const body: any = {};
  
  //   // On ajoute les filtres au body seulement s'ils ne sont pas null
  //   if (proprietaire !== "") body.proprietaire = proprietaire;
  //   if (prix_min !== "") body.prix_min = prix_min;
  //   if (prix_max !== "") body.prix_max = prix_max;
  //   if (categorie !== "") body.categorie = categorie;
  //   if (intitule !== "") body.intitule = intitule;
  //   if (statut !== "") body.statut = statut;
  //   if (editeur !== "") body.editeur = editeur;
  //   if (quantites !== "") body.quantites = quantites;
  
  //   return this.http.request<any[]>('GET', `${this.apiUrl}/jeu/filtered`, {
  //     body: body, // Ajout du body ici
  //     observe: 'response'
  //   }).pipe(map(response => response.body as any[]));
  // }
  

  // Transaction
  createTransaction(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/transaction`, data);
  }

  getTransactionById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/transaction/${id}`);
  }

  getAllTransactions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/transaction`);
  }

  getFilteredTransactions(data: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/transaction/filtered`, data, this.httpOptions);
  }


  updateTransaction(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/transaction/${id}`, data);
  }

  deleteTransaction(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/transaction/${id}`);
  }

  // TypeJeu 
  createTypeJeu(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/typeJeu`, data);
  }

  getTypeJeuById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/typeJeu/${id}`);
  }

  getAllTypeJeux(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/typeJeu`);
  }

  updateTypeJeu(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/typeJeu/${id}`, data);
  }

  deleteTypeJeu(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/typeJeu/${id}`);
  }



  // Vendeur
  createVendeur(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/vendeur`, data);
  }

  getVendeurById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/vendeur/${id}`);
  }

  getAllVendeurs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/vendeur`);
  }

  updateVendeur(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/vendeur/${id}`, data);
  }

  deleteVendeur(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/vendeur/${id}`);
  }

  resetSolde(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/vendeur/solde/${id}`, {});
  }


}
