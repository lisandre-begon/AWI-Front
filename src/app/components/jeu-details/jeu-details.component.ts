import { Component,Input, Output, EventEmitter, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { Jeu } from '../../models/Jeu';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JeuService } from '../../service/jeu.service';

enum Statuts{
  enVente,
  pasEncoreEnVente,
  vendu
}

@Component({
  selector: 'app-jeu-details',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './jeu-details.component.html',
  styleUrl: './jeu-details.component.css'
})
export class JeuDetailsComponent implements OnInit, OnChanges {

  // etiquette : number;
  // intitule : string;
  // editeur : string;
  // statut: Statuts ;
  // dateDepot: Date;
  // dateVente : Date;
  // prix: number;

  stat : Statuts = Statuts.enVente;
  @Input() jeu: Jeu = new Jeu(0, '', '', this.stat, new Date(), new Date(), 0);
  @Output() formSubmitted = new EventEmitter<void>();

  Jeux: Jeu[] = [];
  //isCreatingNew: boolean = false;
  constructor(private route : ActivatedRoute, private servce : JeuService ) {}

  VendeurForm = new FormGroup({
    etiquette: new FormControl(),
    intitule: new FormControl(''),
    editeur: new FormControl(''),
    statut: new FormControl(this.stat),
    dateDepot: new FormControl(new Date()),
    dateVente: new FormControl(new Date()),
    prix: new FormControl(0)    
  });

  selectJeu(jeu: Jeu): void {
    this.jeu = jeu;
    this.ngOnChanges(); 
  }

  updateJeu(): void {
    if (this.jeu){
      this.jeu.etiquette = this.VendeurForm.get('etiquette')?.value;
      this.jeu.intitule = this.VendeurForm.get('intitule')?.value ?? '';
      this.jeu.editeur = this.VendeurForm.get('editeur')?.value ?? '';
      this.jeu.statut = this.VendeurForm.get('statut')?.value ?? Statuts.enVente;
      this.jeu.dateDepot = this.VendeurForm.get('dateDepot')?.value ?? new Date();
      this.jeu.dateVente = this.VendeurForm.get('dateVente')?.value ?? new Date();
      this.jeu.prix = this.VendeurForm.get('prix')?.value?? 0;
      this.formSubmitted.emit();
    }
  }

  displayDetails() {
    if (this.jeu) {
      return  `
      <u>Nom du jeu :</u> ${this.jeu.intitule} <u> Editeur :</u> ${this.jeu.editeur}
      /n <u> Prix :</u> ${this.jeu.prix}`;
    }else{
      return 'Aucun jeu sélectioné';  }
  } 
  ngOnInit(): void {
    this.Jeux = this.servce.getJeux();

    this.route.paramMap.subscribe(params => {const idg  = params.get('etiquette')
    if (idg){
      this.jeu = this.servce.getJeuByEtiquette(parseInt(idg));
    }
    });
  }
  ngOnChanges(): void {
    if (this.jeu){
      this.VendeurForm.setValue({
      etiquette: this.jeu.etiquette,
      intitule: this.jeu.intitule,
      editeur: this.jeu.editeur,
      statut: this.jeu.statut,
      dateDepot: this.jeu.dateDepot,
      dateVente: this.jeu.dateVente,
      prix: this.jeu.prix,
          });
      }
  }

}
