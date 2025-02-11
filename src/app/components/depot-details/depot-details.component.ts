import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../service/api.service';
// Instead of using 'bson', we use 'bson-objectid' to avoid top-level await issues.
import ObjectId from 'bson-objectid';
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
      proprietaire: [null, Validators.required],  // Vérifier que c'est bien un ObjectId valide
      frais: [0, Validators.required],
      remise: [0],
      jeux: this.fb.array([]),
    });
    
    // Initialize jeu form
    this.jeuForm = this.fb.group({
      typeJeuId: [null, Validators.required],
      prix_unitaire: [null, [Validators.required, Validators.min(1)]],  // Ensure valid price
      quantites: [1, Validators.required],
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
  
    // Ensure `prix_unitaire` is set and converted properly
    if (!jeuData.prix_unitaire || jeuData.prix_unitaire <= 0) {
      alert("Veuillez entrer un prix valide.");
      return;
    }
  
    // Convert `prix_unitaire` to `prix` for backend compatibility
    jeuData.proprietaire = this.depotForm.value.proprietaire;
    jeuData.prix = parseFloat(jeuData.prix_unitaire); // Fix naming issue
    delete jeuData.prix_unitaire; // Remove incorrect key
  
    console.log("🛠 Creating game:", jeuData);
  
    this.apiService.createJeu(jeuData).subscribe(
      (res: any) => {
        console.log("✅ Game created successfully:", res);
        this.newJeux.push({
          jeuId: res.jeu._id,
          quantite: jeuData.quantites,
          prix_unitaire: jeuData.prix
        });
        this.calculateTotalPrix();
        this.jeuForm.reset({ typeJeuId: null, prix_unitaire: 0, quantites: 1, categories: [] });
      },
      (err) => {
        console.error("❌ Error creating game:", err);
        alert("Erreur lors de la création du jeu.");
      }
    );
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

  saveDepot() {
    // Vérifier que le propriétaire est bien sélectionné
    if (!this.depotForm.value.proprietaire) {
      console.error("❌ Erreur : Le propriétaire n'est pas sélectionné.");
      return;
    }
  
    // Vérifier que des jeux ont été ajoutés
    if (this.newJeux.length === 0) {
      console.error("❌ Erreur : Aucun jeu n'a été ajouté au dépôt.");
      return;
    }
  
    // Construire l'objet à envoyer au backend
    const depotData = {
      statut: 'depot',
      gestionnaire: this.gestionnaire, // ID du gestionnaire connecté
      proprietaire: this.depotForm.value.proprietaire, // ID du propriétaire du dépôt
      frais: this.depotForm.value.frais || 0, // Vérifie que les frais sont bien définis
      remise: this.depotForm.value.remise || 0, // Si aucune remise, mettre 0
      prix_total: this.totalPrix, // Calculé à partir des jeux ajoutés
      jeux: this.newJeux.map(jeu => ({
        jeuId: jeu.jeuId, // Vérifie que chaque jeu a bien un ID
        quantite: jeu.quantites, // Vérifie la quantité
        prix_unitaire: jeu.prix // Vérifie le prix unitaire
      }))
    };
  
    // Afficher les données avant de les envoyer pour vérification
    console.log("📤 Données envoyées :", JSON.stringify(depotData, null, 2));
  
    // Envoyer les données au backend via l'API
    this.apiService.createTransaction(depotData).subscribe(
      (res) => {
        console.log("✅ Dépôt créé avec succès :", res);
        alert("Dépôt créé avec succès !");
        this.depotForm.reset(); // Réinitialiser le formulaire après succès
        this.newJeux = []; // Vider la liste des jeux ajoutés
      },
      (err) => {
        console.error("❌ Erreur lors de la création du dépôt :", err);
        alert("Erreur lors de la création du dépôt. Vérifiez les données.");
      }
    );
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
