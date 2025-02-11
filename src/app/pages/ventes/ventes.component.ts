import { Component } from '@angular/core';
import { VenteDetailsComponent } from "../../components/ventes-details/ventes-details.component";

@Component({
  selector: 'app-ventes',
  standalone: true,
  imports: [VenteDetailsComponent],
  templateUrl: './ventes.component.html',
  styleUrl: './ventes.component.css'
})
export class VentesComponent {

}
