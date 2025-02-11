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
    date1 = calculateTimeRemaining(this.session.dateFin);
  }

  calculateTimeRemaining(targetDate: string): string {
    const now = new Date();
    const target = new Date(targetDate);
  
    let months = target.getMonth() - now.getMonth();
    let days = target.getDate() - now.getDate();
    let hours = target.getHours() - now.getHours();
  
    if (hours < 0) {
      hours += 24;
      days -= 1;
    }
  
    if (days < 0) {
      const prevMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      days += prevMonth.getDate();
      months -= 1;
    }
  
    if (months < 0) {
      months += 12;
    }
  
    return `${months} mois, ${days} jours, ${hours} heures`;
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
