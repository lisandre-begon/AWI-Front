interface TVendeur{

    id_vendeur: number;
    nom : string;
    prenom : string;
    email: string | null;
    telephone: string;
    solde: number;
}

    export class Vendeur implements TVendeur {
        public id_vendeur: number;
        nom : string;
        prenom : string;
        email: string | null;
        telephone: string;
        solde: number = 0;
        constructor(id_vendeur: number, nom: string, prenom: string, 
            email : string, telephone : string, solde: number 
        ){
            this.id_vendeur = id_vendeur; 
            this.nom = nom;
            this.prenom = prenom;
            this.telephone = telephone;
            if (this.validateEmail(email)){
                this.email = email;
            }
            else{this.email = null;}
            this.solde = solde;

        }
        private validateEmail(email : string) : boolean {
            const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return re.test(email);
        }
    }
    
