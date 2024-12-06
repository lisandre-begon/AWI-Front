import { Injectable } from '@angular/core';
import { Acheteur } from '../models/acheteur';

@Injectable({
  providedIn: 'root'
})
export class AcheteurService {
 //Model acheteur :
  // id_acheteur : number;
  // nom : string;
  // prenom : string;
  // email : string | null; //unique  ?
  // adresse : string | null;

  public acheteurs : Acheteur[] = [
    new Acheteur (2, 'Poom', 'Poomedy', 'poom@p.fr', 'Crous de Clemenceau'),
    new Acheteur (3, 'Chaibderraine', 'Jalil', 'j@j.fr', 'Chez jalil')
  ]

  constructor() { }

  getAcheteurs(): Acheteur[] {
    return this.acheteurs;
  }

  addAcheteur(acheteur: Acheteur): void {
    this.acheteurs.push(acheteur);
    //Faire commentaire dans console maybe
  }

  getAcheteurById(id: number): Acheteur {
    const acheteur = this.acheteurs.find(a => a.id_acheteur === id);
    if (!acheteur){
      throw new Error(`Acheteur with id ${id} not found`);
    }
    return acheteur;
  }
}
