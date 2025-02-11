import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../service/api.service';
// import { AuthService } from '../../service/auth.service';  // Uncomment when AuthService is implemented

@Component({
  selector: 'app-depot-details',
  standalone: true,
  templateUrl: './depot-details.component.html',
  styleUrls: ['./depot-details.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class DepotDetailsComponent implements OnInit {
  // Data for the depot list
  depots: any[] = [];
  // Dropdown data arrays
  vendeurs: any[] = [];
  typeJeux: any[] = [];
  categories: any[] = [];
  // Array to store jeux to be added to the new depot
  newJeux: any[] = [];
  // Reactive forms for depot and for one jeu
  depotForm: FormGroup;
  jeuForm: FormGroup;
  // Gestionnaire (username of the logged-in account)
  // private authService: AuthService, // Uncomment when AuthService is available
  gestionnaire: string = '';
  totalPrix: number = 0;
  selectedDepot: any;
  showDetails: boolean = false;

  // Inject ApiService, FormBuilder, and later AuthService when available.
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService
    // private authService: AuthService  // Uncomment when AuthService is available
  ) {
    // Initialize depot form.
    this.depotForm = this.fb.group({
      proprietaire: [null],
      frais: [0],
      remise: [0]
    });
    // Initialize jeu form.
    this.jeuForm = this.fb.group({
      typeJeuId: [null],
      prix_unitaire: [0],
      quantites: [1],
      categories: [[]]
    });
  }

  ngOnInit(): void {
    this.loadDepots();
    this.loadVendeurs();
    this.loadTypeJeux();
    this.loadCategories();
    // Normally, you would get the gestionnaire from the AuthService:
    // this.gestionnaire = this.authService.getUsername();
    this.gestionnaire = 'cacaman';
  }

  // Load depot transactions (statut === "depot")
  loadDepots() {
    this.apiService.getFilteredTransactions({ statut: 'depot' }).subscribe(data => {
      this.depots = data;
    });
  }

  // Load vendeurs and map to { id, name }
  loadVendeurs() {
    this.apiService.getAllVendeurs().subscribe(data => {
      this.vendeurs = data.map(vendeur => ({
        id: vendeur._id,  // Assuming the vendeur object has _id
        name: `${vendeur.nom} ${vendeur.prenom}`
      }));
    });
  }

  // Load typeJeux and map to { id, name }  
  // Here we assume the API returns objects with an _id.
  loadTypeJeux() {
    this.apiService.getAllTypeJeux().subscribe(data => {
      console.log('Raw typeJeux data:', data);
      this.typeJeux = data.map((typeJeu, index) => ({
        id: typeJeu._id ? typeJeu._id.toString() : index.toString(),
        name: `${typeJeu.intitule} (${typeJeu.editeur})`
      }));
      console.log('Mapped typeJeux:', this.typeJeux);
    });
  }

  // Load categories and map to { id, name }
  loadCategories() {
    this.apiService.getAllCategories().subscribe(data => {
      this.categories = data.map(category => ({
        id: category._id ? category._id.toString() : category.name,
        name: category.name
      }));
    });
  }

  // Called when the user clicks "Ajouter Jeu"
  addJeuToDepot() {
    const jeuData = this.jeuForm.value;
    console.log('Adding game:', jeuData);
    if (!jeuData.typeJeuId) {
      alert('Veuillez sélectionner un type de jeu.');
      return;
    }
    this.newJeux.push(jeuData);
    this.calculateTotalPrix();
    // Reset the jeu form after adding.
    this.jeuForm.reset({ typeJeuId: null, prix_unitaire: 0, quantites: 1, categories: [] });
  }

  // Remove a jeu from the list
  removeJeu(index: number) {
    this.newJeux.splice(index, 1);
    this.calculateTotalPrix();
  }

  // Calculate the total price from the jeux added
  calculateTotalPrix() {
    this.totalPrix = this.newJeux.reduce((sum, jeu) => {
      return sum + (Number(jeu.prix_unitaire) * Number(jeu.quantites));
    }, 0);
  }

  // Called when the depot form is submitted
  saveDepot() {
    const proprietaire = this.depotForm.value.proprietaire;
    if (!proprietaire) {
      alert('Veuillez sélectionner un vendeur.');
      return;
    }

    // For each jeu, create a new jeu via the API.
    const jeuxCreation = this.newJeux.map(jeu => {
      const newJeu = {
        proprietaire: proprietaire,  // same vendeur id as depot
        typeJeuId: jeu.typeJeuId,      // string id (to be converted on the backend)
        statut: 'disponible',
        prix: parseFloat(jeu.prix_unitaire),
        quantites: parseInt(jeu.quantites, 10) || 1,
        categories: jeu.categories,    // array of category ids (strings)
        createdAt: new Date()
      };
      return this.apiService.createJeu(newJeu).toPromise();
    });

    Promise.all(jeuxCreation).then(createdJeux => {
      // Map the created jeux for inclusion in the depot.
      const jeuxForDepot = createdJeux.map(jeu => ({
        jeuId: jeu._id,               // assume API returns the created jeu with _id
        quantite: jeu.quantites,      // note: depot expects 'quantite' (singular)
        prix_unitaire: jeu.prix
      }));

      // Compose the depot object.
      const newDepot = {
        statut: 'depot',
        gestionnaire: this.gestionnaire,  // using the fixed username for now
        proprietaire: proprietaire,
        date_transaction: new Date(),
        prix_total: this.totalPrix,
        remise: this.depotForm.value.remise || 0,
        frais: this.depotForm.value.frais,
        jeux: jeuxForDepot
      };

      this.apiService.createTransaction(newDepot).subscribe(() => {
        // Refresh the depot list and clear the forms.
        this.loadDepots();
        this.newJeux = [];
        this.depotForm.reset();
        this.totalPrix = 0;
      });
    }).catch(err => {
      console.error('Erreur lors de la création des jeux :', err);
    });
  }

  // Returns the display name for a given typeJeuId.
  getTypeJeuName(typeJeuId: string): string {
    const found = this.typeJeux.find(t => t.id === typeJeuId);
    return found ? found.name : 'Type inconnu';
  }

  // (Optional) Display details for a selected depot.
  showDepotDetails(depot: any) {
    this.selectedDepot = depot;
    this.showDetails = true;
  }

  getCategoryName(catId: string): string {
    const found = this.categories.find(c => c.id === catId);
    return found ? found.name : 'Catégorie inconnue';
  }
  
}
