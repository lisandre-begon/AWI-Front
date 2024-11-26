import { Injectable } from '@angular/core';
import { Jeu } from '../models/Jeu';


enum Statuts{
  enVente,
  pasEncoreEnVente,
  vendu
}

@Injectable({
  providedIn: 'root'
})
export class JeuService {

  // etiquette : number;
  // intitule : string;
  // editeur : string;
  // statut: Statuts ;
  // dateDepot: Date;
  // dateVente : Date;
  // prix: number;

  stat : Statuts = Statuts.enVente;
  public Jeux : Jeu[] = [
    new Jeu(1, 'Monopoly', 'Hasbro', this.stat, new Date(), new Date(), 30),
    new Jeu (2, 'Uno', 'Mattel', this.stat, new Date(), new Date(), 10)];

  constructor() { }

  getJeux(): Jeu[] {
    return this.Jeux;
  }

  addJeu(jeu: Jeu): void {
    this.Jeux.push(jeu);
  }

  getJeuByEtiquette(etiquette: number): Jeu {
    const jeu = this.Jeux.find(j => j.etiquette === etiquette);
    if (!jeu){
      throw new Error(`Jeu with etiquette ${etiquette} not found`);
    }
    return jeu;
  }
}
