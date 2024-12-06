import { Component, Input, OnChanges, OnInit, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Acheteur } from '../../models/acheteur';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AcheteurService } from '../../service/acheteur.service';

@Component({
  selector: 'app-acheteur-details',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './acheteur-details.component.html',
  styleUrl: './acheteur-details.component.css'
})
export class AcheteurDetailsComponent implements OnInit, OnChanges {

  @Input() acheteur: Acheteur = new Acheteur(0, '', '', '', '');
  @Output() formSubmitted = new EventEmitter<void>();

  acheteurs: Acheteur[] = [];
  isCreatingNew: boolean = false;
  showDetails: boolean = false;
  constructor(private route : ActivatedRoute, private AcheteurService : AcheteurService) {}

  //Model acheteur :
  // id_acheteur : number;
  // nom : string;
  // prenom : string;
  // email : string | null; //unique  ?
  // adresse : string | null;

  AcheteurForm = new FormGroup({
    id: new FormControl(0),
    nom: new FormControl(''),
    prenom: new FormControl(''),
    email: new FormControl(''),
    adresse: new FormControl('')   
  });

  selectAcheteur(acheteur: Acheteur): void {
    this.acheteur = acheteur;
    this.isCreatingNew = false;
    this.ngOnChanges(); // Mettez à jour le formulaire avec les données sélectionnées
  }

  ngOnInit(): void {
    this.acheteurs = this.AcheteurService.getAcheteurs();

    this.route.paramMap.subscribe(params => {const idg  = params.get('id')
    if (idg){
      this.acheteur = this.AcheteurService.getAcheteurById(parseInt(idg));
    }
    });
  }
  ngOnChanges(): void {
    if (this.acheteur){
      this.AcheteurForm.setValue({
        id: this.acheteur.id_acheteur,
        nom: this.acheteur.nom,
        prenom: this.acheteur.prenom,
        email: this.acheteur.email,
        adresse: this.acheteur.adresse
      });
    }
  }

  updateAcheteur(): void {
    if (this.acheteur){
      this.acheteur.id_acheteur = this.AcheteurForm.get('id')?.value ?? 0;
      this.acheteur.nom = this.AcheteurForm.get('nom')?.value ?? '';
      this.acheteur.prenom = this.AcheteurForm.get('prenom')?.value ?? '';
      this.acheteur.email = this.AcheteurForm.get('email')?.value ?? '';
      this.acheteur.adresse = this.AcheteurForm.get('adresse')?.value ?? '';
      this.formSubmitted.emit();
      //faire message de confirmation? 
    }
  }

  addNewAcheteur(): void {
    const newAcheteur = new Acheteur(
      Math.max(...this.acheteurs.map(a => a.id_acheteur)) + 1,
      this.AcheteurForm.get('nom')?.value ?? '',
      this.AcheteurForm.get('prenom')?.value ?? '',
      this.AcheteurForm.get('email')?.value ?? '',
      this.AcheteurForm.get('adresse')?.value ?? ''
    );
    this.AcheteurService.addAcheteur(newAcheteur);
    this.acheteurs = this.AcheteurService.getAcheteurs();
    this.isCreatingNew = false;
    this.AcheteurForm.reset();
  }

  displayDetails(){
    if (this.acheteur){
      return `
      <u>Nom :</u> ${this.acheteur.nom} <u>Prenom :</u> ${this.acheteur.prenom} <u>Email :<:u> ${this.acheteur.email} <u>Adresse :</u> ${this.acheteur.adresse} `;
    } else {
      return 'Aucun vendeur sélectionné';
   }
  }

}
