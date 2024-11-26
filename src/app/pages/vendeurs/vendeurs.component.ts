import { Component } from '@angular/core';
import { VendeurDetailsComponent } from '../../components/vendeur-details/vendeur-details.component';

@Component({
  selector: 'app-vendeurs',
  standalone: true,
  imports: [VendeurDetailsComponent],
  templateUrl: './vendeurs.component.html',
  styleUrl: './vendeurs.component.css'
})
export class VendeursComponent {

}
