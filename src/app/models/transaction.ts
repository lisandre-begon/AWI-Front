enum statuts{
    depot,
    vente,
    pasEncoreVendu,
}

interface TTransaction {
    statut: statuts;
    gestionnaire: number;
    proprietaire: number;
    acheteur: number;
    date_transaction: Date;
    remise: number;
    prix_total: number;
    frais: number;
    jeux: number[];
}

export class Transaction implements TTransaction {
    statut: statuts;
    gestionnaire: number;
    proprietaire: number;
    acheteur: number;
    date_transaction: Date;
    remise: number;
    prix_total: number;
    frais: number;
    jeux: number[];
    constructor(statut: statuts, gestionnaire: number, proprietaire: number, acheteur: number, date_transaction: Date, remise: number, prix_total: number, frais: number, jeux: number[]){
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
