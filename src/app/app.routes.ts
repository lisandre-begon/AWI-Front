import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AppComponent } from './app.component';
import {AcceuilComponent} from './pages/acceuil/acceuil.component';
import {GestionnaireComponent} from './pages/gestionnaire/gestionnaire.component';

export const routes: Routes = [
    {path: 'acceuil', component: AcceuilComponent},
    {path: 'gestionnaire', component: GestionnaireComponent},
    {path: '', redirectTo: '/acceuil', pathMatch: 'full'},
    {path: '**', component: PageNotFoundComponent}
];
