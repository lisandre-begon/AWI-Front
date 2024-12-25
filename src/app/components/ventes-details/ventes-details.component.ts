import { Component, Input, Output, EventEmitter, OnChanges, OnInit, SimpleChanges} from '@angular/core';
//import { Vente } from '../../models/vente';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from '../../service/transaction.service'

enum statuts{
  depot,
  vente,
  pasEncoreVendu,
}

@Component({
  selector: 'app-ventes-details',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './ventes-details.component.html',
  styleUrl: './ventes-details.component.css'
})
export class VentesDetailsComponent implements OnInit, OnChanges{

  // statut: statuts;
  // gestionnaire: number;
  // proprietaire: number;
  // acheteur: number;
  // date_transaction: Date;
  // remise: number;
  // prix_total: number;
  // frais: number;
  // jeux: number[];

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

}
