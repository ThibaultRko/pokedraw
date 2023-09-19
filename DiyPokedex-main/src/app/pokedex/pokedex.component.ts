import { Component, OnInit } from '@angular/core';
import { PokedexService } from './pokedex.service';
import { PokedexEntry } from './pokedex.interface';


@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit {
  pokedexData?: any[];

  constructor(private pokedexService: PokedexService) { }

  ngOnInit(): void {
    this.pokedexService.getPokedexData().subscribe(data => {
      this.pokedexData = data;
    });
  }
}


