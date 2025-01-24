import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vendeur } from '../models/Vendeur';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:5000'; //à remplir

  constructor(private http: HttpClient) {}

  // Exemple : Pour voir comment ça marche 
  getMessage(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/message`);
  }

  //Reccuperer les vendeurs : 
  getAllVendeur(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/vendeur/`);
  }

  getVendeurById(id : String): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/api/vendeur/:${id}`);
   }

   //Create Vendeur : 

  createVendeur(vendeur : Vendeur ):void{}

   //Reccuperer les acheteurs : 
  getAllAcheteurs(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/acheteur/`);
  }

  getAcheteurById(id : String): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/api/acheteur/:${id}`);
   }

   //Reccuperer les jeux : 
  getAllJeu(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/jeu/`);
  }

  getJeuById(id : String): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/api/jeu/:${id}`);
   }

   //Reccuperer les gestionnaires :
  getAllgest(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/gestionnaire/`);
  }

  getGestById(id : String): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/api/gestionnaire/:${id}`);
   }

   //Reccuperer les typeJeu : 
  getAllTypeJeu(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/typejeu/`);
  }

  getTypeJeuById(id : String): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/api/typejeu/:${id}`);
   }

   //Reccuperer les catégorie : 
  getAllCategorie(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/categorie/`);
  }

  getCategorieById(id : String): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/api/categorie/:${id}`);
   }


   //Reccuperer les transactions : 
  getAllTransaction(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/transaction/`);
  }

  getTransactionById(id : String): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/api/transaction/:${id}`);
   }
}
