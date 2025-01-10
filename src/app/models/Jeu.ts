interface TJeu {
    etiquette: number;
    vendeur: string;
    intitule: string;
    editeur: string;
    statut: string; 
    dateDepot: Date;
    dateVente: Date | null; // Null si le jeu n'est pas vendu
    prix: number;
    quantites: number; 
    categorie: string[]; 
}

export class Jeu implements TJeu {
    etiquette: number;
    vendeur: string;
    intitule: string;
    editeur: string;
    statut: string;
    dateDepot: Date;
    dateVente: Date | null;
    prix: number;
    quantites: number;
    categorie: string[];

    constructor(
        etiquette: number,
        vendeur: string,
        intitule: string,
        editeur: string,
        statut: string,
        dateDepot: Date,
        dateVente: Date | null = null, // Par défaut null pour les jeux non vendus
        prix: number,
        quantites: number,
        categorie: string[] = [] // Par défaut un tableau vide
    ) {
        this.etiquette = etiquette;
        this.vendeur = vendeur;
        this.intitule = intitule;
        this.editeur = editeur;
        this.statut = statut;
        this.dateDepot = dateDepot;
        this.dateVente = dateVente;
        this.prix = prix;
        this.quantites = quantites;
        this.categorie = categorie;
    }
}
