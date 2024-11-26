
enum Statuts{
    enVente,
    pasEncoreEnVente,
    vendu
}

interface TJeu{
    etiquette : number;
    intitule : string;
    editeur : string;
    statut: Statuts ;
    dateDepot: Date;
    dateVente : Date;
    prix: number;
}

    export class Jeu implements TJeu {
        etiquette : number;
        intitule : string;
        editeur : string;
        statut: Statuts ;
        dateDepot: Date;
        dateVente : Date;
        prix: number;
        constructor(etiquette : number, intitule : string, editeur : string, 
            statut: Statuts , dateDepot: Date, dateVente : Date, 
            prix: number){
            this.etiquette = etiquette; 
            this.intitule = intitule;
            this.editeur = editeur;
            this.statut = statut;
            this.dateDepot = dateDepot;
            this.dateVente = dateVente;
            this.prix = prix;

        }
        
    }
    
