import { Component } from '@angular/core';
import { VentesDetailsComponent } from "../../components/ventes-details/ventes-details.component";

@Component({
  selector: 'app-ventes',
  standalone: true,
  imports: [VentesDetailsComponent],
  templateUrl: './ventes.component.html',
  styleUrl: './ventes.component.css'
})
export class VentesComponent {

}
