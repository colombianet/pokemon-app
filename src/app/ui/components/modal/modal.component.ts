import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from 'src/app/aplication/models/pokemon.model';
import { PokemonService } from 'src/app/aplication/use-case/pokemon.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  @Output() closeModalEvent = new EventEmitter<boolean>();
  @Input() pokemon!: Pokemon;
  successfulProcess = '';

  constructor( private pokemonSvc: PokemonService ) {}

  closeModal(updateSearchPokemon: boolean) {
    this.closeModalEvent.emit(updateSearchPokemon);
  }

  deletPokemon( ) {
    this.pokemonSvc.deletePokemonById( this.pokemon.id ).subscribe( r => {
      this.successfulProcess = `'${ this.pokemon.name }' eliminado con éxito`;
      setTimeout(() => {
        this.closeModal(true);
      }, 2000);
    }, e => {
      this.closeModal( false );
    } );
  }
}
