import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jeu-details',
  standalone: true,
  templateUrl: './jeu-details.component.html',
  styleUrls: ['./jeu-details.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class JeuDetailsComponent implements OnInit {
  jeux: any[] = [];
  vendeurs: any[] = [];
  typeJeux: any[] = [];
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
    this.loadVendeurs();
    this.loadTypeJeux();
    this.fetchJeux();
  }

  loadVendeurs() {
    this.apiService.getAllVendeurs().subscribe(data => {
      this.vendeurs = data.map(vendeur => ({
        id: vendeur._id,  // Assuming the vendeur object has _id
        name: `${vendeur.nom} ${vendeur.prenom}`
      }));
    });
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

  loadTypeJeux() {
    this.apiService.getAllTypeJeux().subscribe(data => {
      console.log('Raw typeJeux data:', data);
      this.typeJeux = data.map((typeJeu, index) => ({
        id: typeJeu._id ? typeJeu._id.toString() : index.toString(),
        intitule: `${typeJeu.intitule}`,
        editeur: `${typeJeu.editeur}`
      }));
      console.log('Mapped typeJeux:', this.typeJeux);
    });
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

  // Propriétés pour stocker les valeurs des filtres
  proprietaire: string = "";
  prix_min: string = "";
  prix_max: string = "";
  categorie: string = "";
  intitule: string = "";
  statut: string = "";
  editeur: string = "";
  quantites: string ="";

  // Méthode appelée lorsqu'on clique sur "Filtrer"
  filtrer(): void {
    // Appel à l'API avec les filtres actuels
    this.apiService.getFiltredJeu(
      this.proprietaire,
      this.prix_min,
      this.prix_max,
      this.categorie,
      this.intitule,
      this.statut,
      this.editeur,
      this.quantites
    ).subscribe(
      (result) => {
        this.jeux = result;  // Met à jour les jeux filtrés
      },
      (error) => {
        console.error('Erreur de filtrage', error);
      }
    );
  
  }
}
