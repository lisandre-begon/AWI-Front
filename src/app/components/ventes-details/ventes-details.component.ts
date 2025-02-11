import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-vente-details',
  templateUrl: './ventes-details.component.html',
  styleUrls: ['./ventes-details.component.css']
})
export class VenteDetailsComponent implements OnInit {
  ventes: any[] = [];
  acheteurs: any[] = [];
  availableGames: any[] = [];
  selectedGames: any[] = [];
  venteForm: FormGroup;
  totalPrix: number = 0;
  selectedVente: any;
  showDetails: boolean = false;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.venteForm = this.fb.group({
      acheteur: [null, Validators.required],
      frais: [0, Validators.required],
      remise: [0],
      jeux: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.loadVentes();
    this.loadAcheteurs();
    this.loadAvailableGames();
  }

  loadVentes() {
    this.apiService.getFilteredTransactions({ statut: 'vente' }).subscribe(data => {
      this.ventes = data;
    });
  }

  loadAcheteurs() {
    this.apiService.getAllAcheteurs().subscribe(data => {
      this.acheteurs = data.map(acheteur => ({
        id: acheteur._id,
        name: acheteur.nom
      }));
    });
  }

  loadAvailableGames() {
    this.apiService.getFilteredJeux({ statut: 'disponible' }).subscribe(data => {
      this.availableGames = data;
    });
  }

  addGameToVente(game: any, quantity: number) {
    if (quantity <= 0 || quantity > game.quantites) {
      alert("Quantité invalide !");
      return;
    }

    this.selectedGames.push({
      jeuId: game.jeuId,
      intitule: game.intitule,
      editeur: game.editeur,
      vendeur: game.vendeur,
      prix_unitaire: game.prix_unitaire,
      quantite: quantity
    });

    this.calculateTotalPrix();
  }

  removeGame(index: number) {
    this.selectedGames.splice(index, 1);
    this.calculateTotalPrix();
  }

  calculateTotalPrix() {
    this.totalPrix = this.selectedGames.reduce((sum, jeu) => {
      return sum + (Number(jeu.prix_unitaire) * Number(jeu.quantite));
    }, 0);
  }

  saveVente() {
    if (!this.venteForm.value.acheteur) {
      alert("Sélectionnez un acheteur.");
      return;
    }

    if (this.selectedGames.length === 0) {
      alert("Ajoutez au moins un jeu à la vente.");
      return;
    }

    const venteData = {
      statut: 'vente',
      gestionnaire: "67aa28a2a260b786b8a52f20", 
      acheteur: this.venteForm.value.acheteur,
      frais: this.venteForm.value.frais || 0,
      remise: this.venteForm.value.remise || 0,
      prix_total: this.totalPrix,
      jeux: this.selectedGames.map(jeu => ({
        jeuId: jeu.jeuId,
        quantite: jeu.quantite,
        prix_unitaire: jeu.prix_unitaire
      }))
    };

    this.apiService.createTransaction(venteData).subscribe(
      res => {
        alert("Vente créée avec succès !");
        this.venteForm.reset();
        this.selectedGames = [];
        this.loadVentes();
      },
      err => alert("Erreur lors de la création de la vente.")
    );
  }

  deleteTransaction(transactionId: string) {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette vente ?")) return;

    this.apiService.deleteTransaction(transactionId).subscribe(
      (res) => {
        alert("Vente supprimée avec succès !");
        this.showDetails = false;
        this.loadVentes();
      },
      (err) => {
        alert("Erreur lors de la suppression de la vente.");
      }
    );
  }
}
