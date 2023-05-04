import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/aplication/models/pokemon.model';
import { PokemonService } from 'src/app/aplication/use-case/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pokemons: Pokemon[] = [];
  pokemon!: Pokemon;
  currentPokemons: Pokemon[] = [];
  isShowAddPokemon = false;
  isNewPokemon!: boolean;

  constructor( private pokemonSvc: PokemonService ) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  private getPokemons() {
    this.pokemonSvc.getPokemons().subscribe(r => {
      this.pokemons = r;
      this.currentPokemons = r;
    });
  }

  onChange( event: any ) {
    event = event.target.value.toLowerCase();
    this.currentPokemons = this.pokemons.filter( pokemon => pokemon.name.toLowerCase().includes( event ))
  }

  showAddPokemon(){
    this.isShowAddPokemon = true;
    this.isNewPokemon = true;
  }

  updatePokemons() {
    this.getPokemons();
  }

  closeAddPokemon() {
    this.isShowAddPokemon = false;
    this.pokemon = {} as Pokemon;
    this.updatePokemons();
  }

  noIsNewPokemon() {
    this.isNewPokemon = false;
  }

  editPokemon( pokemon: Pokemon ) {
    this.pokemon = pokemon;
    this.pokemonSvc.getPokemonByID( pokemon.id ).subscribe(console.log);
    this.showAddPokemon();
  }
}
