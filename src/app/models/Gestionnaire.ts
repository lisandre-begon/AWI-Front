interface TGestionnaire{

    id_gestionnaire: number;
    mdp : string;
}

    export class Gestionnaire implements TGestionnaire {
        public id_gestionnaire: number;
        mdp : string;
    
        constructor(id_g: number, mdp: string){
            this.id_gestionnaire = id_g;
            this.mdp = mdp;
        }
    }
    
