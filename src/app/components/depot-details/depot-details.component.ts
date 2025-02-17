import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';

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
  totalPrix: number = 0;
  selectedDepot: any;
  showDetails: boolean = false;

  private router = inject(Router); 

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
    jeuData.proprietaire = this.depotForm.value.proprietaire;
    jeuData.prix = parseFloat(jeuData.prix_unitaire); 
    delete jeuData.prix_unitaire;
  
    console.log("📤 Creating game:", jeuData);
  
    this.apiService.createJeu(jeuData).subscribe(
      (res: any) => {
        console.log("✅ Game created successfully:", res);
  
        if (!res.jeu || !res.jeu._id) {
          console.error("❌ Error: Game ID missing from response.");
          alert("Erreur: l'ID du jeu est introuvable.");
          return;
        }
  
        // Check typeJeuId before adding
        const typeJeu = this.typeJeux.find(t => t.id === jeuData.typeJeuId);
        if (!typeJeu) {
          console.error("❌ Error: typeJeuId not found in typeJeux list.");
          return;
        }
  
        this.newJeux.push({
          jeuId: res.jeu._id,
          quantite: jeuData.quantites,
          prix_unitaire: jeuData.prix,
          typeJeuId: jeuData.typeJeuId
        });
  
        console.log("🛠 Updated newJeux:", this.newJeux);
  
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
    //we delete the game from the database
    this.apiService.deleteJeu(this.newJeux[index].jeuId).subscribe(
      (res: any) => {
        console.log("✅ Game deleted successfully:", res);
      },
      (err) => {
        console.error("❌ Error deleting game:", err);
        alert("Erreur lors de la suppression du jeu.");
      }
    );
    this.calculateTotalPrix();
  }

  deshowVenteDetails() {
    this.showDetails = false;
  }

  calculateTotalPrix() {
    console.log("🔍 Calculating total price with:", this.newJeux);
  
    this.totalPrix = this.newJeux.reduce((sum, jeu) => {
      if (!jeu.prix_unitaire || !jeu.quantite) {
        console.error("❌ Error: Invalid game data for price calculation", jeu);
        return sum; // Skip invalid games
      }
      return sum + (Number(jeu.prix_unitaire) * Number(jeu.quantite));
    }, 0);
  
    console.log("💰 Total calculated price:", this.totalPrix);
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
      gestionnaire: this.gestionnaire,
      proprietaire: this.depotForm.value.proprietaire,
      frais: this.depotForm.value.frais || 0,
      remise: this.depotForm.value.remise || 0,
      prix_total: this.totalPrix,
      jeux: this.newJeux.map(jeu => ({
          jeuId: jeu.jeuId,
          quantite: jeu.quantite,   // ✅ Send correct field
          prix_unitaire: jeu.prix_unitaire     // ✅ Send correct field
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
        //On reinitialise le prix total
        this.totalPrix = 0;
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
    console.log("📌 Depot selected:", depot);
    this.selectedDepot = depot;
    this.showDetails = true;
  }
  

  getCategoryName(catId: string): string {
    const found = this.categories.find(c => c.id === catId);
    return found ? found.name : 'Catégorie inconnue';
  }

  getGestionnaireName(gestionnaireId: string): string {
    const gestionnaire = this.vendeurs.find(v => v.id === gestionnaireId);
    return gestionnaire ? gestionnaire.name : 'Inconnu';
  }

  deleteTransaction(transactionId: string) {
    if (!confirm("❗ Êtes-vous sûr de vouloir supprimer cette transaction ?")) return;
  
    this.apiService.deleteTransaction(transactionId).subscribe(
      (res) => {
        console.log("✅ Transaction supprimée :", res);
        alert("Transaction supprimée avec succès !");
        this.showDetails = false;  // Hide details after deletion
        this.loadDepots(); // Refresh the list of depots
      },
      (err) => {
        console.error("❌ Erreur lors de la suppression :", err);
        alert("Erreur lors de la suppression de la transaction.");
      }
    );
  }

  redirectGestionnaire() {
    this.router.navigate(['/gestionnaire']);
  }

  
}
