import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormsComponent } from './forms/forms.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { ProfilComponent } from './profil/profil.component';
import { InscriptionComponent } from './inscription/inscription.component';

const routes: Routes = [
  {
    path : 'home',
    component : HomeComponent
  },
  {
    path : 'forms',
    component : FormsComponent
  },
  {
    path : 'pokedex',
    component : PokedexComponent
  },
  {
    path : 'profil',
    component : ProfilComponent
  },
  {
    path : 'inscription',
    component : InscriptionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
