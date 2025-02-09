// Updated acheteur-details.component.ts - Matches Vendeur Page Structure
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-acheteur-details',
  standalone: true,
  templateUrl: './acheteur-details.component.html',
  styleUrls: ['./acheteur-details.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class AcheteurDetailsComponent implements OnInit {
  acheteurs: any[] = [];
  selectedAcheteur: any = null;
  isCreatingNew: boolean = false;
  acheteurForm: FormGroup;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.acheteurForm = this.fb.group({
      nom: [''],
      prenom: [''],
      email: [''],
      adresse: [''],
    });
  }

  ngOnInit(): void {
    this.fetchAcheteurs();
  }

  fetchAcheteurs() {
    this.isLoading = true;
    this.apiService.getAllAcheteurs().subscribe(
      (data) => {
        this.acheteurs = data;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Erreur lors du chargement des acheteurs';
        this.isLoading = false;
      }
    );
  }

  selectAcheteur(acheteur: any) {
    this.selectedAcheteur = acheteur;
    this.isCreatingNew = false;
    this.acheteurForm.patchValue(acheteur);
  }

  updateAcheteur() {
    if (!this.selectedAcheteur) return;
    const updatedAcheteur = this.acheteurForm.value;
    this.apiService.updateAcheteur(this.selectedAcheteur._id, updatedAcheteur).subscribe(
      () => {
        alert('Acheteur mis à jour avec succès');
        this.fetchAcheteurs();
      },
      (error) => {
        this.errorMessage = 'Erreur lors de la mise à jour de l\'acheteur';
      }
    );
  }

  addNewAcheteur() {
    const newAcheteur = this.acheteurForm.value;
    this.apiService.createAcheteur(newAcheteur).subscribe(
      () => {
        alert('Nouvel acheteur ajouté');
        this.isCreatingNew = false;
        this.fetchAcheteurs();
        this.acheteurForm.reset();
      },
      (error) => {
        this.errorMessage = 'Erreur lors de la création de l\'acheteur';
      }
    );
  }
}
