import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router'; 


@Component({
  selector: 'app-gestionnaire',
  standalone: true,
  imports: [],
  templateUrl: './gestionnaire.component.html',
  styleUrl: './gestionnaire.component.css'
})
export class GestionnaireComponent {
  private router = inject(Router); 

  redirectdepot(): void {
    this.router.navigate(['/depot']);
  }
  redirectLVendeurs(): void {
    this.router.navigate(['/liste-vendeurs']);
  }
  redirectStock(): void {
    this.router.navigate(['/stock']);
  }
  redirectVentes(): void {
    this.router.navigate(['/ventes']);
  }
  redirectTransactions(): void {
    this.router.navigate(['/transactions']);
  }
  redirectBilan(): void {
    this.router.navigate(['/bilan'])
  }
}
