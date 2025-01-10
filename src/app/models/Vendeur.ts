interface TVendeur{

    id: string;
    nom : string;
    prenom : string;
    email: string | null;
    telephone: string;
    soldes: number;
}

    export class Vendeur implements TVendeur {
        public id: string;
        nom : string;
        prenom : string;
        email: string | null;
        telephone: string;
        soldes: number = 0;
        constructor(id: string, nom: string, prenom: string, 
            email : string, telephone : string, soldes: number 
        ){
            this.id = id; 
            this.nom = nom;
            this.prenom = prenom;
            this.telephone = telephone;
            if (this.validateEmail(email)){
                this.email = email;
            }
            else{this.email = null;}
            this.soldes = soldes;

        }
        private validateEmail(email : string) : boolean {
            const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return re.test(email);
        }
    }
    
