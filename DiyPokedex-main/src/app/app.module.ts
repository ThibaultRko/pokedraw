import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsComponent } from './forms/forms.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { ProfilComponent } from './profil/profil.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { FormsModule } from '@angular/forms';
import { PPokedrawComponent } from './p-pokedraw/p-pokedraw.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FormsComponent,
    HeaderComponent,
    FooterComponent,
    PokedexComponent,
    ProfilComponent,
    InscriptionComponent,
    PPokedrawComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
