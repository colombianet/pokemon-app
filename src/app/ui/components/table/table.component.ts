import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pokemon } from 'src/app/aplication/models/pokemon.model';
import { PokemonService } from 'src/app/aplication/use-case/pokemon.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() pokemons: Pokemon[] = [];
  @Input() isHeightAll = true;
  @Output() updatePokemons = new EventEmitter<boolean>();
  @Output() getPokemonById = new EventEmitter<Pokemon>();
  @Output() isNewPokemon = new EventEmitter<boolean>();
  showModal: boolean = false;
  currentPokemon!: Pokemon;

  constructor( private pokemonSvc: PokemonService ) { }

  ngOnInit(): void {
  }

  onDelete( pokemon: Pokemon ) {
    this.currentPokemon =  pokemon;
    this.showModal =  true;
  }

  closeModal(updateSearchPokemon: boolean) {
    this.showModal = false;
    updateSearchPokemon && this.updatePokemons.emit( true );
  }

  editPokemon( pokemon: Pokemon ) {
    this.isNewPokemon.emit(false);
    this.getPokemonById.emit(pokemon);
  }
}
