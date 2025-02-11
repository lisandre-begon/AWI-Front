import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../service/api.service';
//import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-depot-details',
  standalone: true,
  templateUrl: './depot-details.component.html',
  styleUrls: ['./depot-details.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class DepotDetailsComponent implements OnInit {
  depots: any[] = [];
  vendeurs: any[] = [];
  typeJeux: any[] = [];
  categories: any[] = [];
  newJeux: any[] = [];
  depotForm: FormGroup;
  jeuForm: FormGroup;
  gestionnaire: string = '';
  showDetails: boolean = false;
  selectedDepot: any = null;
  totalPrix: number = 0;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    //private authService: AuthService
  ) {
    this.depotForm = this.fb.group({
      proprietaire: [''],
      date_transaction: [''],
      remise: [0],
      prix_total: [0],
      frais: [0]
    });

    this.jeuForm = this.fb.group({
      typeJeuId: [''],
      prix: [0],
      quantite: [0],
      categories: [[]]
    });
  }

  ngOnInit(): void {
    this.loadDepots();
    this.loadVendeurs();
    this.loadTypeJeux();
    this.loadCategories();
    //this.gestionnaire = this.authService.getUsername();
    this.gestionnaire = 'cacaman';
  }

  loadDepots() {
    this.apiService.getFilteredTransactions({ statut: 'depot' }).subscribe(data => {
      this.depots = data;
    });
  }

  loadVendeurs() {
    this.apiService.getAllVendeurs().subscribe(data => {
      this.vendeurs = data.map(vendeur => ({ id: vendeur._id, name: `${vendeur.nom} ${vendeur.prenom}` }));
    });
  }

  loadTypeJeux() {
    this.apiService.getAllTypeJeux().subscribe(data => {
      console.log('Raw typeJeux data:', data);
      this.typeJeux = data.map(typeJeu => ({
        id: typeJeu._id ? typeJeu._id.toString() : null,  // Convert ObjectId to string
        name: `${typeJeu.intitule} (${typeJeu.editeur})`
      }));
      console.log('Mapped typeJeux:', this.typeJeux);
    });
  }
  

  loadCategories() {
    this.apiService.getAllCategories().subscribe(data => {
      this.categories = data.map(category => ({ id: category._id, name: category.name }));
    });
  }

  addJeuToDepot(jeuData: any) {
    console.log('Adding game:', jeuData);
    this.newJeux.push(jeuData);
    this.calculateTotalPrix();
  }

  removeJeu(index: number) {
    this.newJeux.splice(index, 1);
    this.calculateTotalPrix();
  }

  calculateTotalPrix() {
    this.totalPrix = this.newJeux.reduce((sum, jeu) => sum + (jeu.prix * jeu.quantite), 0);
  }

  saveDepot() {
    if (!this.depotForm.value.proprietaire) {
      alert('Veuillez sélectionner un vendeur.');
      return;
    }
    
    const jeuxCreation = this.newJeux.map(jeu => {
      return this.apiService.createJeu({
        proprietaire: this.depotForm.value.proprietaire,
        typeJeuId: jeu.typeJeuId,
        prix: jeu.prix,
        categories: jeu.categories,
        quantites: jeu.quantite,
        statut: 'disponible'
      }).toPromise();
    });

    Promise.all(jeuxCreation).then(createdJeux => {
      const jeuxForDepot = createdJeux.map(jeu => ({
        jeuId: jeu._id,
        quantite: jeu.quantites,
        prix_unitaire: jeu.prix
      }));

      const depotData = {
        gestionnaire: this.gestionnaire,
        statut: 'depot',
        proprietaire: this.depotForm.value.proprietaire,
        date_transaction: new Date().toISOString(),
        prix_total: this.totalPrix,
        frais: this.depotForm.value.frais,
        remise: this.depotForm.value.remise,
        jeux: jeuxForDepot
      };

      this.apiService.createTransaction(depotData).subscribe(() => {
        this.loadDepots();
        this.newJeux = [];
        this.depotForm.reset();
        this.totalPrix = 0;
      });
    });
  }

  showDepotDetails(depot: any) {
    this.selectedDepot = depot;
    this.showDetails = true;
  }

  getTypeJeuName(typeJeuId: string): string {
    console.log('getTypeJeuName called with:', typeJeuId);
    console.log('Available typeJeux:', this.typeJeux);
    
    const foundType = this.typeJeux.find(t => String(t.id).trim() === String(typeJeuId).trim());
    
    console.log('Found typeJeu:', foundType);
    return foundType ? foundType.name : 'Type inconnu';
  }
  

  getCategoriesNames(categoryIds: string[]): string {
    const categoryNames = categoryIds.map(id => {
      const category = this.categories.find(cat => cat.id === id);
      return category ? category.name : null;
    }).filter(name => name);
    return categoryNames.length ? categoryNames.join(', ') : 'Aucune';
  }
}