import { Injectable } from '@angular/core';
import { Vendeur } from '../models/Vendeur';

@Injectable({
  providedIn: 'root'
})
export class VendeursService {

  //Model vendeur :
  //id_vendeur: number;
  //nom : string;
  //prenom : string;
  //email: string | null;
  //telephone: string;
  //solde: number;
  public vendeurs: Vendeur[] = [
    new Vendeur (1, 'Ducasse', 'Agathe', 'agathe.ducasse@gmail.com', '0649163301', 0),
    new Vendeur (2, 'Drucké', 'Aloïs','drAloi@gmail.com', '0769267895', 0),
  ];
  constructor() { }

  getVendeurs(): Vendeur[] {
    return this.vendeurs;
  }

  addVendeur(vendeur: Vendeur): void {
    this.vendeurs.push(vendeur);
  }

  getVendeurById(id: number): Vendeur {
    const vendeur = this.vendeurs.find(v => v.id_vendeur === id);
    if (!vendeur){
      throw new Error(`Vendeur with id ${id} not found`);
    }
    return vendeur;
}
}