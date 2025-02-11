import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router'; 
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-gestionnaire',
  standalone: true,
  imports: [],
  templateUrl: './gestionnaire.component.html',
  styleUrl: './gestionnaire.component.css'
})
export class GestionnaireComponent {
  private router = inject(Router); 
  constructor(private authService: AuthService) {}

  deconnexion(): void {
    this.authService.logout();
  }

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
  redirectListAch(): void {
    this.router.navigate(['/acheteurs'])
  }
  redirectAcceuil(): void {
    this.router.navigate(['/acceuil'])
  }
}
