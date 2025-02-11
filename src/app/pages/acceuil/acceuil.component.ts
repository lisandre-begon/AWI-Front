import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router'; 
import {SessionService} from '../../service/session.service';
import {Session} from '../../models/session';
//import { VendeurDetailsComponent } from '../../components/vendeur-details/vendeur-details.component';

@Component({
  selector: 'app-acceuil',
  standalone: true,
  imports: [],
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.css'
})
export class AcceuilComponent implements OnInit {

  private router = inject(Router); 

  constructor(private sessionService: SessionService) { }

  date1 : Date = new Date();
  date2 : Date = new Date();

  session: Session = new Session( this.date1, this.date2, 12, "encours" , "0a");
  errorMessage: string = '';

  ngOnInit(): void {
    this.getcurrentsession();
  }

  getcurrentsession(): void {
    this.sessionService.getSessionEnCours().subscribe((data) => {
      this.session = data;
    },
    (error) => {
      this.errorMessage = 'Erreur lors du chargement des acheteurs';
    });
  }

  redirectGest(): void {
    this.router.navigate(['/login']);
  }
  redirectAch(): void {
    this.router.navigate(['/acheteur'])
  }
}
