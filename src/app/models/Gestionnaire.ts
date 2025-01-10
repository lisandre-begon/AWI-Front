interface TGestionnaire{

    id: string;
    pseudo : string;
    mdp : string;
}

    export class Gestionnaire implements TGestionnaire {
        public id: string;
        pseudo : string;
        mdp : string;
    
        constructor(id_g: number,pseudo : string, mdp: string){
            this.id = id_g;
            this.pseudo = pseudo;
            this.mdp = mdp;
        }
    }
    
