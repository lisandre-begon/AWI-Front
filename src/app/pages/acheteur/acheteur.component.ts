import { Component } from '@angular/core';
import { AcheteurDetailsComponent } from '../../components/acheteur-details/acheteur-details.component';

@Component({
  selector: 'app-acheteur',
  standalone: true,
  templateUrl: './acheteur.component.html',
  styleUrls: ['./acheteur.component.css'],
  imports: [AcheteurDetailsComponent]
})
export class AcheteurComponent {}
