import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { Jeu } from '../../models/Jeu';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JeuService } from '../../service/jeu.service';

@Component({
  selector: 'app-jeu-details',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './jeu-details.component.html',
  styleUrls: ['./jeu-details.component.css']
})
export class JeuDetailsComponent implements OnInit, OnChanges {
  @Input() jeu: Jeu = new Jeu(0, '', '', '', 'enVente', new Date(), null, 0, 0, []);
  @Output() formSubmitted = new EventEmitter<void>();

  // Liste des jeux à afficher
  Jeux: Jeu[] = [];

  VendeurForm = new FormGroup({
    etiquette: new FormControl<number | null>(null),
    vendeur: new FormControl<string | null>(''),
    intitule: new FormControl<string | null>(''),
    editeur: new FormControl<string | null>(''),
    statut: new FormControl<string | null>('enVente'),
    dateDepot: new FormControl<Date | null>(new Date()),
    dateVente: new FormControl<Date | null>(null),
    prix: new FormControl<number | null>(0),
    quantites: new FormControl<number | null>(0),
    categorie: new FormControl<string[] | null>([])
  });

  constructor(private route: ActivatedRoute, private service: JeuService) {}

  ngOnInit(): void {
    // Charge les jeux disponibles dans le service
    this.Jeux = this.service.getJeux();

    // Récupère un jeu spécifique via l'URL si fourni
    this.route.paramMap.subscribe(params => {
      const id = params.get('etiquette');
      if (id) {
        this.jeu = this.service.getJeuByEtiquette(Number(id));
        this.ngOnChanges();
      }
    });
  }

  ngOnChanges(): void {
    if (this.jeu) {
      this.VendeurForm.setValue({
        etiquette: this.jeu.etiquette,
        vendeur: this.jeu.vendeur,
        intitule: this.jeu.intitule,
        editeur: this.jeu.editeur,
        statut: this.jeu.statut,
        dateDepot: this.jeu.dateDepot,
        dateVente: this.jeu.dateVente,
        prix: this.jeu.prix,
        quantites: this.jeu.quantites,
        categorie: this.jeu.categorie
      });
    }
  }

  // Méthode pour sélectionner un jeu et afficher ses détails
  selectJeu(jeu: Jeu): void {
    this.jeu = jeu;
    this.ngOnChanges();
  }

  updateJeu(): void {
    if (this.jeu) {
      this.jeu.etiquette = this.VendeurForm.get('etiquette')?.value ?? 0;
      this.jeu.vendeur = this.VendeurForm.get('vendeur')?.value ?? '';
      this.jeu.intitule = this.VendeurForm.get('intitule')?.value ?? '';
      this.jeu.editeur = this.VendeurForm.get('editeur')?.value ?? '';
      this.jeu.statut = this.VendeurForm.get('statut')?.value ?? 'enVente';
      this.jeu.dateDepot = this.VendeurForm.get('dateDepot')?.value ?? new Date();
      this.jeu.dateVente = this.VendeurForm.get('dateVente')?.value ?? null;
      this.jeu.prix = this.VendeurForm.get('prix')?.value ?? 0;
      this.jeu.quantites = this.VendeurForm.get('quantites')?.value ?? 0;
      this.jeu.categorie = this.VendeurForm.get('categorie')?.value ?? [];
      this.formSubmitted.emit();
    }
  }
}
