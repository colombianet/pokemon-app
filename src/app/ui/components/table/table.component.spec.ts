import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PokemonService } from '../../../aplication/use-case/pokemon.service';
import { of } from 'rxjs';
import { Pokemon } from 'src/app/aplication/models/pokemon.model';
import { TableComponent } from './table.component';

const pokemons = [
  {
    "id": 177,
    "name": "charmeleon",
    "image": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/005.png",
    "attack": 100,
    "defense": 100,
    "hp": 0,
    "type": "default",
    "idAuthor": 1
  },
  {
    "id": 178,
    "name": "charizard",
    "image": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/006.png",
    "attack": 75,
    "defense": 86,
    "hp": 33,
    "type": "Original",
    "idAuthor": 1
  },
  {
    "id": 179,
    "name": "squirtle",
    "image": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/007.png",
    "attack": 39,
    "defense": 82,
    "hp": 14,
    "type": "Original",
    "idAuthor": 1
  }
];
const pokemon = {
  "id": 177,
  "name": "charmeleon",
  "image": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/005.png",
  "attack": 100,
  "defense": 100,
  "hp": 0,
  "type": "default",
  "idAuthor": 1
};
describe('TableComponent', () => {

  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let service: PokemonService;

  beforeEach(() => {
      TestBed.configureTestingModule({
          imports: [
              HttpClientTestingModule
          ],
          declarations: [
              TableComponent
          ],
          providers: [
            PokemonService
          ],
          schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();
  });


  beforeEach(() => {
      fixture = TestBed.createComponent(TableComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      service = fixture.debugElement.injector.get(PokemonService);
  });

  it('should create', () => {
      expect(component).toBeTruthy();
  });

  it('onDelete', () => {
    const spy2 = jest.spyOn(component, 'onDelete');

    component.onDelete(pokemon as Pokemon);
    expect(component.currentPokemon).toEqual(pokemon);
    expect(component.showModal).toBeTruthy();
  });

  it('closeModal', () => {
    const spy1 = jest.spyOn(component, 'closeModal');
    const spy2 = jest.spyOn(component.updatePokemons, 'emit');
    component.closeModal(true);
    expect(component.showModal).toBeFalsy();
    expect(spy2).toHaveBeenCalledWith(true);
  });

  it('editPokemon', () => {
    const spy1 = jest.spyOn(component, 'editPokemon');
    const spy2 = jest.spyOn(component.isNewPokemon, 'emit');
    const spy3 = jest.spyOn(component.getPokemonById, 'emit');
    component.editPokemon(pokemon as Pokemon);
    expect(spy2).toHaveBeenCalledWith(false);
    expect(spy3).toHaveBeenCalledWith(pokemon);
  });
});
