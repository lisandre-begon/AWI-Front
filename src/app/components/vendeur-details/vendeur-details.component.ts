import { Component, Input, OnChanges, OnInit, Output, EventEmitter} from '@angular/core';
import { Vendeur } from '../../models/Vendeur'; 
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VendeursService } from '../../service/vendeur-service.service';

@Component({
  selector: 'app-vendeur-details',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './vendeur-details.component.html',
  styleUrl: './vendeur-details.component.css'
})

export class VendeurDetailsComponent implements OnInit, OnChanges {
  
  @Input() vendeur: Vendeur = new Vendeur(0, '', '', '', '', 0);
  @Output() formSubmitted = new EventEmitter<void>();

  vendeurs: Vendeur[] = [];
  isCreatingNew: boolean = false;
  constructor(private route : ActivatedRoute, private VendeursService : VendeursService) {}

  //Model vendeur :
  //id_vendeur: number;
  //nom : string;
  //prenom : string;
  //email: string | null;
  //telephone: string;
  //solde: number;

  vendeurForm = new FormGroup({
    id: new FormControl(0),
    nom: new FormControl(''),
    prenom: new FormControl(''),
    email: new FormControl(''),
    telephone: new FormControl(''),
    solde: new FormControl(0)    
  });

  selectVendeur(vendeur: Vendeur): void {
    this.vendeur = vendeur;
    this.ngOnChanges(); // Mettez à jour le formulaire avec les données sélectionnées
  }


  ngOnInit(): void {
    this.vendeurs = this.VendeursService.getVendeurs();

    this.route.paramMap.subscribe(params => {const idg  = params.get('id')
    if (idg){
      this.vendeur = this.VendeursService.getVendeurById(parseInt(idg));
    }
    });
    //Faire message ? 
  }
  ngOnChanges(): void {
    if (this.vendeur){
      this.vendeurForm.setValue({
      id: this.vendeur.id_vendeur,
      nom: this.vendeur.nom,
      prenom: this.vendeur.prenom,
      email: this.vendeur.email,
      telephone: this.vendeur.telephone,
      solde: this.vendeur.solde,
          });
      }
  }

  updateVendeur(){
    if (this.vendeur){
      this.vendeur.id_vendeur = this.vendeurForm.get('id')?.value ?? 0;
      this.vendeur.nom = this.vendeurForm.get('nom')?.value ?? '';
      this.vendeur.prenom = this.vendeurForm.get('prenom')?.value ?? '';
      this.vendeur.email = this.vendeurForm.get('email')?.value ?? '';
      this.vendeur.telephone = this.vendeurForm.get('telephone')?.value ?? '';
      this.vendeur.solde = this.vendeurForm.get('solde')?.value ?? 0;
      this.formSubmitted.emit();
      //faire message de confirmation? 
    }
  }

  addNewVendeur(): void {
    const newVendeur = new Vendeur(
      Math.max(...this.vendeurs.map((v) => v.id_vendeur)) + 1, // Génère un nouvel ID
      this.vendeurForm.get('nom')?.value ?? '',
      this.vendeurForm.get('prenom')?.value ?? '',
      this.vendeurForm.get('email')?.value ?? '',
      this.vendeurForm.get('telephone')?.value ?? '',
      this.vendeurForm.get('solde')?.value ?? 0
    );
    this.VendeursService.addVendeur(newVendeur);
    this.vendeurs = this.VendeursService.getVendeurs();
    this.isCreatingNew = false;
    this.vendeurForm.reset(); }

  dislayDetails(){
    if (this.vendeur){
      return `
      <u>Nom :</u> ${this.vendeur.nom} <u>Prenom :</u> ${this.vendeur.prenom} <u>Email :<:u> ${this.vendeur.email} <u>Telephone :</u> ${this.vendeur.telephone} <u>Solde :</u> ${this.vendeur.solde}`;
    } else {
      return 'Aucun vendeur sélectionné';
   }
   }

   
}
