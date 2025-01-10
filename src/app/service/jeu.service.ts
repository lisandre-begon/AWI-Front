import { Injectable } from '@angular/core';
import { Jeu } from '../models/Jeu';

@Injectable({
  providedIn: 'root'
})
export class JeuService {
  public Jeux: Jeu[] = [
    new Jeu(
      1, 
      'Vendeur1', 
      'Monopoly', 
      'Hasbro', 
      'enVente', 
      new Date('2023-01-01'), 
      null, 
      30, 
      5, 
      ['Famille', 'Stratégie']
    ),
    new Jeu(
      2, 
      'Vendeur2', 
      'Uno', 
      'Mattel', 
      'pasEncoreEnVente', 
      new Date('2023-03-01'), 
      null, 
      10, 
      20, 
      ['Cartes', 'Rapide']
    )
  ];

  constructor() {}

  /**
   * Récupérer tous les jeux.
   */
  getJeux(): Jeu[] {
    return this.Jeux;
  }

  /**
   * Ajouter un nouveau jeu.
   * @param jeu - Instance du jeu à ajouter.
   */
  addJeu(jeu: Jeu): void {
    this.Jeux.push(jeu);
  }

  /**
   * Récupérer un jeu par son étiquette.
   * @param etiquette - Identifiant unique du jeu.
   * @returns Jeu correspondant.
   * @throws Erreur si aucun jeu avec cette étiquette n'est trouvé.
   */
  getJeuByEtiquette(etiquette: number): Jeu {
    const jeu = this.Jeux.find(j => j.etiquette === etiquette);
    if (!jeu) {
      throw new Error(`Jeu avec l'étiquette ${etiquette} introuvable`);
    }
    return jeu;
  }

  /**
   * Mettre à jour les détails d'un jeu existant.
   * @param updatedJeu - Instance mise à jour du jeu.
   */
  updateJeu(updatedJeu: Jeu): void {
    const index = this.Jeux.findIndex(j => j.etiquette === updatedJeu.etiquette);
    if (index === -1) {
      throw new Error(`Jeu avec l'étiquette ${updatedJeu.etiquette} introuvable`);
    }
    this.Jeux[index] = updatedJeu;
  }

  /**
   * Supprimer un jeu par son étiquette.
   * @param etiquette - Identifiant unique du jeu à supprimer.
   */
  deleteJeu(etiquette: number): void {
    const index = this.Jeux.findIndex(j => j.etiquette === etiquette);
    if (index === -1) {
      throw new Error(`Jeu avec l'étiquette ${etiquette} introuvable`);
    }
    this.Jeux.splice(index, 1);
  }
}
