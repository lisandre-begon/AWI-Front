interface TAcheteur{
    id_acheteur : number;
    nom : string;
    prenom : string;
    email : string | null; //unique  ?
    adresse : string | null;
}
export class Acheteur implements TAcheteur{
    id_acheteur: number;
    nom: string;
    prenom: string;
    email: string | null;
    adresse: string | null;
    constructor(id_acheteur : number, nom : string, prenom: string,email : string, adresse : string | null){
        this.id_acheteur = id_acheteur;
        this.nom = nom; 
        this.prenom = prenom;
        if (this.validateEmail(email)){
            this.email = email;
        }
        else{this.email = null;}
        this.adresse = adresse;
    }
    private validateEmail(email : string) : boolean {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    }
}
