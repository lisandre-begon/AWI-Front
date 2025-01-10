import { Injectable } from '@angular/core';
import { Vendeur } from '../models/Vendeur';

@Injectable({
  providedIn: 'root'
})
export class VendeursService {

  public vendeurs: Vendeur[] = [
    new Vendeur('1', 'Ducasse', 'Agathe', 'agathe.ducasse@gmail.com', '0649163301', 100),
    new Vendeur('2', 'Drucké', 'Aloïs', 'drAloi@gmail.com', '0769267895', 200),
  ];

  constructor() {}

  /**
   * Retourne la liste des vendeurs.
   */
  getVendeurs(): Vendeur[] {
    return this.vendeurs;
  }

  /**
   * Ajoute un nouveau vendeur à la liste.
   * @param vendeur - Le vendeur à ajouter.
   */
  addVendeur(vendeur: Vendeur): void {
    this.vendeurs.push(vendeur);
  }

  /**
   * Recherche un vendeur par son ID.
   * @param id - L'ID du vendeur à rechercher.
   * @returns Le vendeur correspondant ou une erreur si non trouvé.
   */
  getVendeurById(id: string): Vendeur {
    const vendeur = this.vendeurs.find(v => v.id === id);
    if (!vendeur) {
      throw new Error(`Vendeur avec l'ID ${id} non trouvé.`);
    }
    return vendeur;
  }

  /**
   * Met à jour un vendeur existant.
   * @param updatedVendeur - Le vendeur mis à jour.
   */
  updateVendeur(updatedVendeur: Vendeur): void {
    const index = this.vendeurs.findIndex(v => v.id === updatedVendeur.id);
    if (index === -1) {
      throw new Error(`Vendeur avec l'ID ${updatedVendeur.id} non trouvé.`);
    }
    this.vendeurs[index] = updatedVendeur;
  }
}
