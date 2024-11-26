import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AppComponent } from './app.component';
import {AcceuilComponent} from './pages/acceuil/acceuil.component';
import {GestionnaireComponent} from './pages/gestionnaire/gestionnaire.component';
import {AcheteurComponent} from './pages/acheteur/acheteur.component';
import { VendeursComponent } from './pages/vendeurs/vendeurs.component';
import {DepotComponent} from './pages/depot/depot.component';
import {StockComponent} from './pages/stock/stock.component';
import {VentesComponent} from './pages/ventes/ventes.component';
import {TransacComponent} from './pages/transac/transac.component';
import {BilanComponent} from './pages/bilan/bilan.component';

export const routes: Routes = [
    {path: 'acceuil', component: AcceuilComponent},
    {path: 'gestionnaire', component: GestionnaireComponent},
    {path: 'acheteur', component: AcheteurComponent},
    {path: 'liste-vendeurs', component: VendeursComponent},
    {path: 'depot', component: DepotComponent},
    {path: 'stock', component: StockComponent},
    {path: 'ventes', component: VentesComponent},
    {path: 'transactions', component: TransacComponent},
    {path: 'bilan', component: BilanComponent},
    {path: '', redirectTo: '/acceuil', pathMatch: 'full'},
    {path: '**', component: PageNotFoundComponent}
];
