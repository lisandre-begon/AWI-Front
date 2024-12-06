import { Component } from '@angular/core';
import { AcheteurDetailsComponent } from '../../components/acheteur-details/acheteur-details.component';
@Component({
  selector: 'app-list-ach',
  standalone: true,
  imports: [AcheteurDetailsComponent],
  templateUrl: './list-ach.component.html',
  styleUrl: './list-ach.component.css'
})
export class ListAchComponent {
  

}
