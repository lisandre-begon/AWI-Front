// ventes-details.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

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
  }

  loadVentes() {
    this.apiService.getFilteredTransactions({ statut: 'vente' }).subscribe(data => this.ventes = data);
  }

  loadJeuxDisponibles() {
    this.apiService.getFilteredJeux({ statut: 'disponible' }).subscribe(data => {
      this.jeuxDisponibles = data.filter(jeu => jeu.statut === 'disponible');
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

  addJeuToVente(event: Event): void {
    const target = event.target as HTMLSelectElement | null;
    if (!target) return; // Prevents null access

    const jeuId = target.value;
    const selectedJeu = this.jeuxDisponibles.find(jeu => jeu._id === jeuId);

    if (selectedJeu && !this.newJeux.some(j => j._id === jeuId)) {
        this.newJeux.push({ ...selectedJeu, quantite: 1 });
        this.calculateTotalPrix();
    }

    // Reset selection after adding
    target.value = "";
  }


  updateJeuQuantite(index: number, quantite: string) {
    const parsedQuantite = parseInt(quantite, 10);
    if (isNaN(parsedQuantite) || parsedQuantite <= 0) return;

    const selectedJeu = this.newJeux[index];
    if (!selectedJeu) return;

    const jeuDisponible = this.jeuxDisponibles.find(j => j._id === selectedJeu._id);
    if (!jeuDisponible) return; // Prevents undefined access

    if (parsedQuantite <= jeuDisponible.quantite) {
        this.newJeux[index].quantite = parsedQuantite;
        this.calculateTotalPrix();
    }
  }


  removeJeu(index: number) {
    this.newJeux.splice(index, 1);
    this.calculateTotalPrix();
  }

  calculateTotalPrix() {
    this.totalPrix = this.newJeux.reduce((sum, jeu) => sum + (jeu.prix_unitaire * jeu.quantite), 0);
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
        jeux: this.newJeux.map(jeu => ({ jeuId: jeu._id, quantite: jeu.quantite, prix_unitaire: jeu.prix_unitaire }))
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
