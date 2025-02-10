import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jeu-details',
  standalone: true,
  templateUrl: './jeu-details.component.html',
  styleUrls: ['./jeu-details.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class JeuDetailsComponent implements OnInit {
  jeux: any[] = [];
  selectedJeu: any = null;
  jeuForm: FormGroup;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.jeuForm = this.fb.group({
      intitule: [''],
      editeur: [''],
      vendeur: [''],
      statut: [''],
      dateDepot: [''],
      dateVente: [''],
      prix: [''],
      quantites: [''],
      categories: [''],
    });
  }

  ngOnInit(): void {
    this.fetchJeux();
  }

  fetchJeux() {
    this.isLoading = true;
    this.apiService.getAllJeux().subscribe(
      (data) => {
        this.jeux = data;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Erreur lors du chargement des jeux';
        this.isLoading = false;
      }
    );
  }

  selectJeu(jeu: any) {
    this.selectedJeu = jeu;
    this.jeuForm.patchValue(jeu);
  }

  updateJeu() {
    if (!this.selectedJeu) return;
    const updatedJeu = this.jeuForm.value;
    this.apiService.updateJeu(this.selectedJeu.etiquette, updatedJeu).subscribe(
      () => {
        alert('Jeu mis à jour avec succès');
        this.fetchJeux();
      },
      (error) => {
        this.errorMessage = 'Erreur lors de la mise à jour du jeu';
      }
    );
  }

  deleteJeu() {
    if (!this.selectedJeu) return;
    if (!confirm('Voulez-vous vraiment supprimer ce jeu ?')) return;
    this.apiService.deleteJeu(this.selectedJeu.etiquette).subscribe(
      () => {
        alert('Jeu supprimé avec succès');
        this.fetchJeux();
        this.selectedJeu = null;
        this.jeuForm.reset();
      },
      (error) => {
        this.errorMessage = 'Erreur lors de la suppression du jeu';
      }
    );
  }
}
