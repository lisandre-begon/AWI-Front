import { Component } from '@angular/core';
import { DepotDetailsComponent } from '../../components/depot-details/depot-details.component'

@Component({
  selector: 'app-depot',
  standalone: true,
  imports: [DepotDetailsComponent],
  templateUrl: './depot.component.html',
  styleUrl: './depot.component.css'
})
export class DepotComponent {

}
