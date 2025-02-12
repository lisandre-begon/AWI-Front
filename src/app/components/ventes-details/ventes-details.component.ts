import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ventes-details',
  templateUrl: './ventes-details.component.html',
  styleUrls: ['./ventes-details.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class VentesDetailsComponent implements OnInit {
  ventes: any[] = [];
  jeuxDisponibles: any[] = [];
  newJeux: any[] = [];
  acheteurs: any[] = [];
  venteForm: FormGroup;
  jeuForm: FormGroup;
  totalPrix: number = 0;
  showDetails: boolean = false;
  selectedVente: any;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    // General vente form
    this.venteForm = this.fb.group({
      acheteur: [null, Validators.required],
      frais: [0, [Validators.required, Validators.min(1)]],
      remise: [0, [Validators.required, Validators.min(0)]]
    });

    // Form for selecting a game
    this.jeuForm = this.fb.group({
      jeuId: [null, Validators.required],
      quantite: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.loadVentes();
    this.loadJeuxDisponibles();
    this.loadAcheteurs();
  }

  loadVentes() {
    this.apiService.getFilteredTransactions({ statut: 'vente' }).subscribe(data => this.ventes = data);
  }

  loadJeuxDisponibles() {
    this.apiService.getFilteredJeux({ statut: 'disponible' }).subscribe(data => {
      this.jeuxDisponibles = data;
    }, error => {
      console.error("❌ Erreur lors du chargement des jeux:", error);
    });
  }

  loadAcheteurs() {
    this.apiService.getAllAcheteurs().subscribe(data => {
      this.acheteurs = data.map(acheteur => ({
        id: acheteur._id,
        name: `${acheteur.nom} ${acheteur.prenom}`
      }));
    });
  }

  addJeuToVente() {
    if (this.jeuForm.invalid) return;

    const jeuId = this.jeuForm.value.jeuId;
    const quantite = this.jeuForm.value.quantite;

    // Get the selected game from jeuxDisponibles
    const selectedJeu = this.jeuxDisponibles.find(j => j.etiquette === jeuId);
    if (!selectedJeu) return;

    // Check if the game is already in newJeux
    const existingJeu = this.newJeux.find(j => j.jeuId === jeuId);
    if (!existingJeu) {
      this.newJeux.push({
        jeuId: selectedJeu.etiquette,
        intitule: selectedJeu.intitule,
        vendeur: selectedJeu.proprietaire, // Automatically linked
        prix: selectedJeu.prix, // Automatically linked
        quantite: quantite
      });

      this.calculateTotalPrix();
    }

    // Reset the form after adding a game
    this.jeuForm.reset({ jeuId: null, quantite: 1 });
  }

  removeJeu(index: number) {
    this.newJeux.splice(index, 1);
    this.calculateTotalPrix();
  }

  calculateTotalPrix() {
    this.totalPrix = this.newJeux.reduce((sum, jeu) => sum + (jeu.prix * jeu.quantite), 0);
  }

  showVenteDetails(vente: any) {
    console.log("📌 Vente sélectionnée:", vente);
    this.selectedVente = vente;
    this.showDetails = true;
  }
  
  saveVente() {
    if (this.venteForm.valid && this.newJeux.length > 0) {
      const venteData = {
        acheteur: this.venteForm.value.acheteur,
        frais: this.venteForm.value.frais,
        remise: this.venteForm.value.remise,
        prix_total: this.totalPrix,
        jeux: this.newJeux.map(jeu => ({
          jeuId: jeu.jeuId,
          quantite: jeu.quantite,
          prix_unitaire: jeu.prix
        }))
      };

      this.apiService.createTransaction({ statut: 'vente', ...venteData }).subscribe(() => {
        this.loadVentes();
        this.newJeux = [];
        this.venteForm.reset();
        this.totalPrix = 0;
      });
    }
  }
}
