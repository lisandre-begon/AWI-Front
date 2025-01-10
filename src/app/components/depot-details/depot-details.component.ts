import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Transaction } from '../../models/transaction';
import { CommonModule } from '@angular/common';
import { Validators, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule, FormGroup, FormControl, FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from '../../service/transaction.service'
import { stat } from 'fs';



enum Statuts {
  depot = "depot",
  vente = "vente",
}
//modele
// id : string;
// statut: Statuts;
// gestionnaire: string;
// proprietaire?: string; 
// acheteur?: string;
// date_transaction: Date;
// remise: number;
// prix_total: number;
// frais: number;
// jeux: string[]; 
@Component({
  selector: 'app-depot-details',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './depot-details.component.html',
  styleUrl: './depot-details.component.css'
})
export class DepotDetailComponent implements OnInit, OnChanges {
  @Input() depots: Transaction[] = []; // Liste des dépôts
  @Input() selectedDepotId: string | null = null; // ID du dépôt sélectionné
  depotForm: FormGroup;
  selectedDepot: Transaction | null = null;

  constructor(private transactionService: TransactionService, private fb: FormBuilder) {
    this.depotForm = this.fb.group({
      id: [null, Validators.required],
      gestionnaire: [null, Validators.required],
      proprietaire: [null, Validators.required],
      date_transaction: [new Date(), Validators.required],
      remise: [0, [Validators.required, Validators.min(0)]],
      prix_total: [0, [Validators.required, Validators.min(0)]],
      frais: [0, [Validators.required, Validators.min(0)]],
      jeux: [[], Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadDepots();
    if (this.selectedDepotId !== null) {
      this.selectDepotById(this.selectedDepotId);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedDepotId'] && this.selectedDepotId !== null) {
      this.selectDepotById(this.selectedDepotId);
    }
    if (changes['depots']) {
      this.loadDepots();
    }
  }

  loadDepots(): void {
    this.depots = this.transactionService.getDepots();
  }

  selectDepotById(depotId: string): void {
    const depot = this.transactionService.getTransactionById(depotId);
    if (depot) {
      this.selectedDepot = depot;
      this.updateForm(depot);
    }
  }


  updateJeux(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
  
    // Parse the comma-separated string into an array of numbers
    const parsedValues = value
      .split(',')
      .map(id => parseInt(id.trim(), 10))
      .filter(id => !isNaN(id)); // Remove invalid numbers
  
    this.depotForm.get('jeux')?.setValue(parsedValues);
  }

  updateForm(depot: Transaction): void {
    this.depotForm.patchValue({
      gestionnaire: depot.gestionnaire,
      proprietaire: depot.proprietaire,
      date_transaction: depot.date_transaction,
      remise: depot.remise,
      prix_total: depot.prix_total,
      frais: depot.frais,
      jeux: depot.jeux,
    });
  }

  clearSelection(): void {
    this.selectedDepot = null;
    this.depotForm.reset({
      gestionnaire: null,
      proprietaire: null,
      date_transaction: new Date(),
      remise: 0,
      prix_total: 0,
      frais: 0,
      jeux: [],
    });
  }

  saveDepot(): void {
    if (this.depotForm.invalid) {
      alert('Veuillez remplir correctement le formulaire.');
      return;
    }

    const depotData = this.depotForm.value;
    if (this.selectedDepot) {
      // Modification d'un dépôt existant
      this.selectedDepot.gestionnaire = depotData.gestionnaire;
      this.selectedDepot.proprietaire = depotData.proprietaire;
      this.selectedDepot.date_transaction = depotData.date_transaction;
      this.selectedDepot.remise = depotData.remise;
      this.selectedDepot.prix_total = depotData.prix_total;
      this.selectedDepot.frais = depotData.frais;
      this.selectedDepot.jeux = depotData.jeux;
      alert('Dépôt modifié avec succès.');
    } else {
      // Création d'un nouveau dépôt
      const newDepot = new Transaction( 
        (Math.max(...this.depots.map(d => parseInt(d.id, 10) || 0)) + 1).toString(),
        Statuts.depot,
        depotData.gestionnaire,
        depotData.proprietaire,
        null,
        depotData.date_transaction,
        depotData.remise,
        depotData.prix_total,
        depotData.frais,
        depotData.jeux
      );
      this.transactionService.addTransaction(newDepot);
      alert('Nouveau dépôt créé avec succès.');
    }

    this.clearSelection();
    this.loadDepots();
  }
}
