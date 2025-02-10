interface TSession{
    _id?:string;
    dateDebut : Date;
    dateFin : Date;
    FraisDepot : Number;
    statutSession : string;
}

export class Session implements TSession {
    public _id?:string;
    public dateDebut : Date;
    public dateFin : Date;
    public FraisDepot : Number;
    public statutSession : string;

    constructor(dateDebut : Date, dateFin : Date, fraisDepot : Number, statutSession : string='', _id: string){
        this.FraisDepot = fraisDepot;
        this._id = _id;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.statutSession = statutSession;
    }
}
