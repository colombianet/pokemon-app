import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Pokemon } from 'src/app/aplication/models/pokemon.model';
import { PokemonService } from '../../../aplication/use-case/pokemon.service';

@Component({
  selector: 'app-add-pokemon',
  templateUrl: './add-pokemon.component.html',
  styleUrls: ['./add-pokemon.component.scss']
})
export class AddPokemonComponent implements OnInit {

  @Input() showHide = false;
  @Input() pokemon!: Pokemon;
  @Input() isNewPokemon: boolean = false;
  @Output() closeAddPokemon = new EventEmitter<boolean>();
  successfulProcess = '';
  addForm!: FormGroup;
  isnew = true;

  constructor( private fb: FormBuilder, private pokemonSvc: PokemonService ) { }


  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.addForm = this.fb.group({
      name: [this.pokemon?.name || '', [ Validators.required ] ],
      attack: [this.pokemon?.attack || 0, [ Validators.required ] ],
      image: [this.pokemon?.image || '', [ Validators.required ] ],
      defense: [this.pokemon?.defense || 0, [ Validators.required ] ],
    });
  }

  createPokemon() {
    const { name, image, attack, defense } = this.addForm.value;
    const currentPokemon = {
      "name": name,
      "image": this.pokemon?.image || 'https://i.pinimg.com/564x/f6/8d/7f/f68d7f5d1dbdeaf46035c4f9dbf29486.jpg',
      "attack": attack,
      "defense": defense,
      "hp": 100,
      "type": "Eléctrico",
      "idAuthor": 1
    };

    !this.pokemon.name
    ? this.createNewPokemon(currentPokemon as Pokemon)
    :
    this.updatePokemon(currentPokemon as Pokemon )
  }

  private updatePokemon(currentPokemon: Pokemon) {
    return this.pokemonSvc.updatePokemonByID(this.pokemon.id, currentPokemon as Pokemon).subscribe( r => {
      this.actualizationSuccess(`Pokemon '${ currentPokemon.name }' actualizado con éxito`);
    });
  }

  private createNewPokemon(currentPokemon: Pokemon) {
    this.pokemonSvc.createPokemon(currentPokemon as Pokemon).subscribe(r => {
      this.actualizationSuccess(`Pokemon '${ currentPokemon.name }' creado con éxito`);
    });
  }

  private actualizationSuccess( message: string ) {
    this.successfulProcess = message;
    setTimeout(() => {
      this.closeAddPokemon.emit(true);
    }, 2000);
  }

  cancelAddPokemon() {
    this.isNewPokemon = false;
    this.addForm.reset();
    this.closeAddPokemon.emit( true );
  }
}
