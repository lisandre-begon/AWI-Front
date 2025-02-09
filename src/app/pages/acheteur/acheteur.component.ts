import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-acheteur',
  standalone: true,
  templateUrl: './acheteur.component.html',
  styleUrls: ['./acheteur.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class AcheteurComponent implements OnInit {
  acheteurs: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  acheteurForm: FormGroup;
  isEditing: boolean = false;
  selectedAcheteur: any = null;

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
    this.apiService.getAllAcheteurs().subscribe(
      (data) => {
        this.acheteurs = data;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to fetch acheteurs.';
        this.isLoading = false;
      }
    );
  }

  createAcheteur() {
    const newAcheteur = this.acheteurForm.value;
    this.apiService.createAcheteur(newAcheteur).subscribe(
      () => {
        this.fetchAcheteurs();
        this.acheteurForm.reset();
      },
      (error) => {
        this.errorMessage = 'Failed to create acheteur.';
      }
    );
  }

  editAcheteur(acheteur: any) {
    this.isEditing = true;
    this.selectedAcheteur = acheteur;
    this.acheteurForm.patchValue(acheteur);
  }

  updateAcheteur() {
    const updatedAcheteur = this.acheteurForm.value;
    this.apiService.updateAcheteur(this.selectedAcheteur._id, updatedAcheteur).subscribe(
      () => {
        this.fetchAcheteurs();
        this.acheteurForm.reset();
        this.isEditing = false;
        this.selectedAcheteur = null;
      },
      (error) => {
        this.errorMessage = 'Failed to update acheteur.';
      }
    );
  }

  deleteAcheteur(id: string) {
    this.apiService.deleteAcheteur(id).subscribe(
      () => {
        this.fetchAcheteurs();
      },
      (error) => {
        this.errorMessage = 'Failed to delete acheteur.';
      }
    );
  }
}
