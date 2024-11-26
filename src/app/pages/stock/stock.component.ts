import { Component } from '@angular/core';
import { JeuDetailsComponent } from '../../components/jeu-details/jeu-details.component';

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [JeuDetailsComponent],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css'
})
export class StockComponent {

}
