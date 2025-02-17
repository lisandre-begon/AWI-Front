// Updated vendeur-details.component.ts - Added Delete Functionality
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendeur-details',
  standalone: true,
  templateUrl: './vendeur-details.component.html',
  styleUrls: ['./vendeur-details.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class VendeurDetailsComponent implements OnInit {
  vendeurs: any[] = [];
  selectedVendeur: any = null;
  isCreatingNew: boolean = false;
  vendeurForm: FormGroup;
  isLoading: boolean = false;
  errorMessage: string = '';

  private router = inject(Router); 

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.vendeurForm = this.fb.group({
      nom: [''],
      prenom: [''],
      email: [''],
      telephone: [''],
      soldes: [''],
    });
  }

  ngOnInit(): void {
    this.fetchVendeurs();
  }

  fetchVendeurs() {
    this.isLoading = true;
    this.apiService.getAllVendeurs().subscribe(
      (data) => {
        this.vendeurs = data;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Erreur lors du chargement des vendeurs';
        this.isLoading = false;
      }
    );
  }

  selectVendeur(vendeur: any) {
    this.selectedVendeur = vendeur;
    this.isCreatingNew = false;
    this.vendeurForm.patchValue(vendeur);
  }

  updateVendeur() {
    if (!this.selectedVendeur) return;
    const updatedVendeur = this.vendeurForm.value;
    this.apiService.updateVendeur(this.selectedVendeur._id, updatedVendeur).subscribe(
      () => {
        alert('Vendeur mis à jour avec succès');
        this.fetchVendeurs();
      },
      (error) => {
        this.errorMessage = 'Erreur lors de la mise à jour du vendeur';
      }
    );
  }

  addNewVendeur() {
    const newVendeur = this.vendeurForm.value;
    this.apiService.createVendeur(newVendeur).subscribe(
      () => {
        alert('Nouveau vendeur ajouté');
        this.isCreatingNew = false;
        this.fetchVendeurs();
        this.vendeurForm.reset();
      },
      (error) => {
        this.errorMessage = 'Erreur lors de la création du vendeur';
      }
    );
  }

  deleteVendeur(id: string) {
    if (!confirm('Voulez-vous vraiment supprimer ce vendeur ?')) return;
    this.apiService.deleteVendeur(id).subscribe(
      () => {
        alert('Vendeur supprimé avec succès');
        this.fetchVendeurs();
        if (this.selectedVendeur && this.selectedVendeur._id === id) {
          this.selectedVendeur = null;
          this.vendeurForm.reset();
        }
      },
      (error) => {
        this.errorMessage = 'Erreur lors de la suppression du vendeur';
      }
    );
  }
  redirectGestionnaire() {
    this.router.navigate(['/gestionnaire']);
  }

  resetSolde() {
    this.apiService.resetSolde(this.selectedVendeur._id).subscribe(
      () => {
        alert('Solde réinitialisé avec succès');
        this.fetchVendeurs();
      },
      (error) => {
        this.errorMessage = 'Erreur lors de la réinitialisation du solde';
      }
    );
  }
}
