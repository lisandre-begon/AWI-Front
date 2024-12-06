import { Component, Input, Output, EventEmitter, OnChanges, OnInit} from '@angular/core';
//import { Vente } from '../../models/vente';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from '../../service/transaction.service'

@Component({
  selector: 'app-ventes-details',
  standalone: true,
  imports: [],
  templateUrl: './ventes-details.component.html',
  styleUrl: './ventes-details.component.css'
})
export class VentesDetailsComponent {

}
