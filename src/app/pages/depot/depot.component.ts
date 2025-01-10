import { Component } from '@angular/core';
import { DepotDetailComponent } from '../../components/depot-details/depot-details.component'

@Component({
  selector: 'app-depot',
  standalone: true,
  imports: [DepotDetailComponent],
  templateUrl: './depot.component.html',
  styleUrl: './depot.component.css'
})
export class DepotComponent {

}
