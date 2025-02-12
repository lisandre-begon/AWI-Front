// ventes-details.component.ts
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
  gestionnaire: string = '';
  totalPrix: number = 0;
  showDetails: boolean = false;
  selectedVente: any;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.venteForm = this.fb.group({
      acheteur: [null, Validators.required],
      frais: [0, [Validators.required, Validators.min(1)]],
      remise: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.loadVentes();
    this.loadJeuxDisponibles();
    this.loadAcheteurs();
    this.gestionnaire = "67aa28a2a260b786b8a52f20"
  }

  loadVentes() {
    this.apiService.getFilteredTransactions({ statut: 'vente' }).subscribe(data => this.ventes = data);
  }

  loadJeuxDisponibles() {
    this.apiService.getFilteredJeux({ statut: 'disponible' }).subscribe(data => {
      console.log("📥 Jeux Disponibles reçus:", data);
      this.jeuxDisponibles = data.map(jeu => ({
        ...jeu,
        quantiteSelectionnee: 1 // Default quantity when displaying games
      }));
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

  addJeuToVente(jeu: any) {
    if (!jeu || jeu.quantiteSelectionnee === undefined || jeu.quantiteSelectionnee < 1) return;

    // Check if the game is already in newJeux
    const existingJeu = this.newJeux.find(j => j.etiquette === jeu.etiquette);
    if (!existingJeu) {
        // Add the game with the selected quantity
        this.newJeux.push({
            etiquette: jeu.etiquette,
            intitule: jeu.intitule,
            quantite: jeu.quantiteSelectionnee,  // ✅ Stores the selected quantity correctly
            prix: jeu.prix
        });
    }

    this.calculateTotalPrix();
  }





  updateJeuQuantite(index: number, quantite: string) {
    const parsedQuantite = parseInt(quantite, 10);
    if (isNaN(parsedQuantite) || parsedQuantite <= 0) return;

    const selectedJeu = this.newJeux[index];
    if (!selectedJeu) return;

    selectedJeu.quantite = parsedQuantite;
    this.calculateTotalPrix();
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
          jeuId: jeu.etiquette, 
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
