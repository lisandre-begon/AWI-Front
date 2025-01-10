enum Statuts {
    depot = "depot",
    vente = "vente",
  }

interface TTransaction {
    id : string;
    statut: Statuts;
    gestionnaire: string;
    proprietaire: string | null; 
    acheteur: string | null;
    date_transaction: Date;
    remise: number;
    prix_total: number;
    frais: number;
    jeux: string[]; 
}

export class Transaction implements TTransaction {
    id: string;
    statut: Statuts;
    gestionnaire: string;
    proprietaire: string | null;
    acheteur: string | null;
    date_transaction: Date;
    remise: number;
    prix_total: number;
    frais: number;
    jeux: string[];

    constructor(
        id: string,
        statut: Statuts,
        gestionnaire: string,
        proprietaire: string| null,
        acheteur: string | null,
        date_transaction: Date,
        remise: number,
        prix_total: number,
        frais: number,
        jeux: string[]
    
    ) {
        this.id = id;
        this.statut = statut;
        this.gestionnaire = gestionnaire;
        this.proprietaire = proprietaire;
        this.acheteur = acheteur;
        this.date_transaction = date_transaction;
        this.remise = remise;
        this.prix_total = prix_total;
        this.frais = frais;
        this.jeux = jeux;
    }
}
