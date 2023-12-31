import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {
  private apiUrl = 'http://localhost:3000/pokedex'; // L'URL de ton API

  constructor(private http: HttpClient) { }

  getPokedexData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}