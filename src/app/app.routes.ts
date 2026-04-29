import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { ContactComponent } from './pages/contact/contact';
import { FavoritesComponent } from './pages/favorites/favorites';
import { AboutComponent } from './pages/about/about';
import { ServicesComponent } from './pages/services/services';
import { TermsComponent } from './pages/terms/terms';

export const routes: Routes = [
  { path: '', component: HomeComponent },             
  { path: 'services', component: ServicesComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'nosotros', component: AboutComponent },
  { path: 'terminos', component: TermsComponent }
];