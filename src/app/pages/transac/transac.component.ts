import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { CommonModule} from '@angular/common'
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-transac',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './transac.component.html',
  styleUrl: './transac.component.css'
})
export class TransacComponent implements OnInit {
  transa: any[] = [];
  vendeurs: any[] = [];
  acheteurs : any[]  = [];
  typeJeux: any[] = [];
  categories: any[] = [];
  newJeux: any[] = [];
  gestionnaire: string = '';
  totalPrix: number = 0;
  selectedDepot: any;
  showDetails: boolean = false;
  transForm: FormGroup;

  constructor(
    private apiService: ApiService, private fb: FormBuilder
  ) {
    this.transForm = this.fb.group({
      intitule: [''],
      editeur: [''],
      vendeur: [''],
      statut: [''],
      dateDepot: [''],
      dateVente: [''],
      prix: [''],
      quantites: [''],
      categories: [''],
    });
  }

  ngOnInit(): void {
    this.loadTrans();
    this.loadVendeurs();
    this.loadTypeJeux();
    this.loadCategories();
    this.loadAcheteurs();
  }

  details(){
    this.showDetails = true;
  }
  
  loadTrans() {
    this.apiService.getAllTransactions().subscribe(data => {
      this.transa = data;
    });
  }

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

  loadAcheteurs() {
    this.apiService.getAllAcheteurs().subscribe(data => {
      console.log('Raw acheteurs data:', data);
      this.acheteurs = data.map(acheteur => ({
        id: acheteur._id,  // Assuming the acheteur object has _id
        name: `${acheteur.nom} ${acheteur.prenom}`,
        email : acheteur.email,
        adresse : acheteur.adresse
      }));
      console.log('Mapped acheteurs:', this.acheteurs);
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

   // Propriétés pour stocker les valeurs des filtres
   proprietaire: string = '';
   prix_min: string = '';
   prix_max: string = '';
   categorie: string = '';
   intitule: string = '';
   statut: string = '';
   editeur: string = '';
   quantites: string ='';
 
   // Méthode appelée lorsqu'on clique sur "Filtrer"
   filtrer(): void {
     const body: any = {};
 
     console.log('Filtres:', this.proprietaire, this.prix_min, this.prix_max, this.categorie, this.intitule, this.statut, this.editeur, this.quantites);
 
     if (this.proprietaire !== '') body.proprietaire = this.proprietaire;
     if (this.prix_min !== '') body.prix_min = this.prix_min;
     if (this.prix_max !== '') body.prix_max = this.prix_max;
     if (this.categorie !== '') body.categorie = this.categorie;
     if (this.intitule !== '') body.intitule = this.intitule;
     if (this.statut !== '') body.statut = this.statut;
     if (this.editeur !== '') body.editeur = this.editeur;
     if (this.quantites !== '') body.quantites = this.quantites;
 
     console.log('body', body);
 
     this.apiService.getFilteredTransactions(body).subscribe(data => {
       console.log('data recu:', data);
       this.transa = data;
     });    
     
   }
}
