import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router'; 

@Component({
  selector: 'app-acceuil',
  standalone: true,
  imports: [],
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.css'
})
export class AcceuilComponent {

  private router = inject(Router); 

  redirectGest(): void {
    this.router.navigate(['/gestionnaire']);
  }
  redirectAch(): void {
    this.router.navigate(['/acheteur'])
  }
}
