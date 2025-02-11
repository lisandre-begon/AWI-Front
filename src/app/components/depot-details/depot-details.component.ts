import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../service/api.service';
// Remove the top-level import of ObjectId to avoid top-level await issues.
import { ObjectId } from 'bson';
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
  // Gestionnaire (username or id of the logged-in account)
  // private authService: AuthService, // Uncomment when AuthService is available
  gestionnaire: string = '';
  totalPrix: number = 0;
  selectedDepot: any;
  showDetails: boolean = false;

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
    this.gestionnaire = '67aa28a2a260b786b8a52f20';
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
      console.log('Raw vendeurs data:', data);
      this.vendeurs = data.map(vendeur => ({
        id: vendeur._id,  // Assuming the vendeur object has _id
        name: `${vendeur.nom} ${vendeur.prenom}`
      }));
      console.log('Mapped vendeurs:', this.vendeurs);
    });
  }

  // Load typeJeux and map to { id, name }
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
    // Add the proprietaire from the depot form to jeuData
    jeuData.proprietaire = this.depotForm.value.proprietaire;
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
  async saveDepot() {
    const proprietaire = this.depotForm.value.proprietaire;
    if (!proprietaire) {
      alert('Veuillez sélectionner un vendeur.');
      return;
    }

    try {
      // Dynamically import ObjectId from bson to avoid top-level await issues.
      const { ObjectId } = await import('bson');

      const jeuxCreation = this.newJeux.map(jeu => {
        // Build the new jeu object with proper ObjectId conversions.
        const newJeu = {
          proprietaire: new ObjectId(proprietaire),
          typeJeuId: new ObjectId(jeu.typeJeuId),
          statut: 'disponible',
          prix: parseFloat(jeu.prix_unitaire),
          quantites: parseInt(jeu.quantites, 10) || 1,
          categories: jeu.categories.map((catId: string) => new ObjectId(catId)),
          createdAt: new Date(),
        };
        // Call the API to create the jeu and return a promise.
        return this.apiService.createJeu(newJeu).toPromise();
      });

      const createdJeux = await Promise.all(jeuxCreation);

      // Map the created jeux for inclusion in the depot.
      const jeuxForDepot = createdJeux.map(jeu => ({
        // Convert jeu._id to ObjectId (if necessary) or use it as is if it's already a valid string.
        jeuId: new ObjectId(jeu._id),
        quantite: jeu.quantites,
        prix_unitaire: jeu.prix
      }));

      // Compose the depot object.
      const newDepot = {
        statut: 'depot',
        gestionnaire: new ObjectId(this.gestionnaire),
        proprietaire: new ObjectId(proprietaire),
        date_transaction: new Date(),
        prix_total: this.totalPrix,
        remise: this.depotForm.value.remise || 0,
        frais: this.depotForm.value.frais,
        jeux: jeuxForDepot.map(jeu => ({
          jeuId: new ObjectId(jeu.jeuId),
          quantite: jeu.quantite,
          prix_unitaire: jeu.prix_unitaire,
        })),
      };

      this.apiService.createTransaction(newDepot).subscribe(() => {
        // Refresh the depot list and clear the forms.
        this.loadDepots();
        this.newJeux = [];
        this.depotForm.reset();
        this.totalPrix = 0;
      });
    } catch (err) {
      console.error('Erreur lors de la création des jeux :', err);
    }
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
