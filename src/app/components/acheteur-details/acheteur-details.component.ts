import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
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
  styleUrls: ['./acheteur-details.component.css']
})
export class AcheteurDetailsComponent implements OnInit, OnChanges {

  @Input() acheteur: Acheteur = new Acheteur('', '', '', '', '');
  @Output() formSubmitted = new EventEmitter<void>();

  showDetails: boolean = false;
  acheteurs: Acheteur[] = [];
  isCreatingNew: boolean = false;

  AcheteurForm = new FormGroup({
    id: new FormControl(''),
    nom: new FormControl(''),
    prenom: new FormControl(''),
    email: new FormControl(''),
    adresse: new FormControl('')
  });

  constructor(private route: ActivatedRoute, private acheteurService: AcheteurService) {}

  ngOnInit(): void {
    this.acheteurs = this.acheteurService.getAcheteurs();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        const fetchedAcheteur = this.acheteurService.getAcheteurById(id);
        if (fetchedAcheteur) {
          this.acheteur = fetchedAcheteur;
          this.updateFormValues();
        }
      }
    });
  }

  ngOnChanges(): void {
    this.updateFormValues();
  }

  updateFormValues(): void {
    if (this.acheteur) {
      this.AcheteurForm.setValue({
        id: this.acheteur.id,
        nom: this.acheteur.nom,
        prenom: this.acheteur.prenom,
        email: this.acheteur.email,
        adresse: this.acheteur.adresse
      });
    }
  }

  selectAcheteur(acheteur: Acheteur): void {
    this.acheteur = acheteur;
    this.isCreatingNew = false;
    this.updateFormValues();
  }

  updateAcheteur(): void {
    if (this.acheteur) {
      this.acheteur.id = this.AcheteurForm.get('id')?.value ?? '';
      this.acheteur.nom = this.AcheteurForm.get('nom')?.value ?? '';
      this.acheteur.prenom = this.AcheteurForm.get('prenom')?.value ?? '';
      this.acheteur.email = this.AcheteurForm.get('email')?.value ?? '';
      this.acheteur.adresse = this.AcheteurForm.get('adresse')?.value ?? '';
      this.formSubmitted.emit();
    }
  }

  addNewAcheteur(): void {
    const newId = (Math.max(...this.acheteurs.map(a => parseInt(a.id, 10) || 0)) + 1).toString();
    const newAcheteur = new Acheteur(
      newId,
      this.AcheteurForm.get('nom')?.value ?? '',
      this.AcheteurForm.get('prenom')?.value ?? '',
      this.AcheteurForm.get('email')?.value ?? '',
      this.AcheteurForm.get('adresse')?.value ?? ''
    );
    this.acheteurService.addAcheteur(newAcheteur);
    this.acheteurs = this.acheteurService.getAcheteurs();
    this.isCreatingNew = false;
    this.AcheteurForm.reset();
  }

  displayDetails(): string {
    if (this.acheteur) {
      return `
        <u>Nom :</u> ${this.acheteur.nom} 
        <u>Prénom :</u> ${this.acheteur.prenom} 
        <u>Email :</u> ${this.acheteur.email} 
        <u>Adresse :</u> ${this.acheteur.adresse}`;
    } else {
      return 'Aucun acheteur sélectionné';
    }
  }
}
