import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { Vendeur } from '../../models/Vendeur'; 
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VendeursService } from '../../service/vendeur-service.service';

@Component({
  selector: 'app-vendeur-details',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './vendeur-details.component.html',
  styleUrls: ['./vendeur-details.component.css']
})
export class VendeurDetailsComponent implements OnInit, OnChanges {

  @Input() vendeur: Vendeur = new Vendeur('', '', '', '', '', 0);
  @Output() formSubmitted = new EventEmitter<void>();

  vendeurs: Vendeur[] = [];
  isCreatingNew: boolean = false;
  message: string = '';

  constructor(private route: ActivatedRoute, private VendeursService: VendeursService) {}

  vendeurForm = new FormGroup({
    id: new FormControl(''),
    nom: new FormControl(''),
    prenom: new FormControl(''),
    email: new FormControl(''),
    telephone: new FormControl(''),
    solde: new FormControl(0)
  });

  ngOnInit(): void {
    this.vendeurs = this.VendeursService.getVendeurs();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.vendeur = this.VendeursService.getVendeurById(id);
        this.ngOnChanges();
      }
    });
  }

  ngOnChanges(): void {
    if (this.vendeur) {
      this.vendeurForm.setValue({
        id: this.vendeur.id,
        nom: this.vendeur.nom,
        prenom: this.vendeur.prenom,
        email: this.vendeur.email ?? '',
        telephone: this.vendeur.telephone,
        solde: this.vendeur.soldes
      });
    }
  }

  updateVendeur(): void {
    if (this.vendeur) {
      this.vendeur.id = this.vendeurForm.get('id')?.value ?? '';
      this.vendeur.nom = this.vendeurForm.get('nom')?.value ?? '';
      this.vendeur.prenom = this.vendeurForm.get('prenom')?.value ?? '';
      this.vendeur.email = this.vendeurForm.get('email')?.value ?? null;
      this.vendeur.telephone = this.vendeurForm.get('telephone')?.value ?? '';
      this.vendeur.soldes = this.vendeurForm.get('soldes')?.value ?? 0;

      this.VendeursService.updateVendeur(this.vendeur);
      this.formSubmitted.emit();
      this.message = `Le vendeur ${this.vendeur.nom} ${this.vendeur.prenom} a été mis à jour avec succès.`;
    }
  }

  addNewVendeur(): void {
    const newId = (Math.max(...this.vendeurs.map(a => parseInt(a.id, 10) || 0)) + 1).toString();
    const newVendeur = new Vendeur(
      newId,
      this.vendeurForm.get('nom')?.value ?? '',
      this.vendeurForm.get('prenom')?.value ?? '',
      this.vendeurForm.get('email')?.value ?? '',
      this.vendeurForm.get('telephone')?.value ?? '',
      this.vendeurForm.get('solde')?.value ?? 0
    );

    this.VendeursService.addVendeur(newVendeur);
    this.vendeurs = this.VendeursService.getVendeurs();
    this.isCreatingNew = false;
    this.vendeurForm.reset();
    this.message = `Le vendeur ${newVendeur.nom} ${newVendeur.prenom} a été ajouté avec succès.`;
  }

  selectVendeur(vendeur: Vendeur): void {
    this.vendeur = vendeur;
    this.ngOnChanges();
  }

  displayDetails(): string {
    if (this.vendeur) {
      return `
        <u>Nom :</u> ${this.vendeur.nom} 
        <u>Prénom :</u> ${this.vendeur.prenom} 
        <u>Email :</u> ${this.vendeur.email ?? 'Non renseigné'} 
        <u>Téléphone :</u> ${this.vendeur.telephone} 
        <u>Solde :</u> ${this.vendeur.soldes}`;
    }
    return 'Aucun vendeur sélectionné';
  }
}
