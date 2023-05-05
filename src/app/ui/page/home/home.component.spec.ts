import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomeComponent } from './home.component';
import { PokemonService } from '../../../aplication/use-case/pokemon.service';
import { of } from 'rxjs';
import { Pokemon } from 'src/app/aplication/models/pokemon.model';

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
describe('HomeComponent', () => {

  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service: PokemonService;

  beforeEach(() => {
      TestBed.configureTestingModule({
          imports: [
              HttpClientTestingModule
          ],
          declarations: [
              HomeComponent
          ],
          providers: [
            PokemonService
          ],
          schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();
  });


  beforeEach(() => {
      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      service = fixture.debugElement.injector.get(PokemonService);
  });

  it('should create', () => {
      expect(component).toBeTruthy();
  });

  it('updatePokemons', () => {
    const spy1 = jest.spyOn(service, 'getPokemons').mockImplementation( () => of(pokemons as Pokemon[]) );
    const spy2 = jest.spyOn(component as any, 'getPokemons');

    component.updatePokemons();
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(component.pokemons.length > 0).toBeTruthy();
    expect(component.currentPokemons.length > 0).toBeTruthy();
  });

  it('onChange', () => {
    const spy2 = jest.spyOn(component, 'onChange');
    const event = {
      preventDefault() {},
      target: { value: 'the-value' }
    }
    component.onChange(event);
    expect(spy2).toHaveBeenCalled();
  });

  it('showAddPokemon', () => {
    const spy2 = jest.spyOn(component, 'showAddPokemon');
    component.showAddPokemon();
    expect(component.isShowAddPokemon).toBeTruthy();
    expect(component.isNewPokemon).toBeTruthy();
  });

  it('closeAddPokemon', () => {
    jest.spyOn(component, 'closeAddPokemon');
    const spy1 = jest.spyOn(component, 'updatePokemons');
    component.closeAddPokemon();
    expect(component.isShowAddPokemon).toBeFalsy();
    expect(component.pokemon).toBeDefined();
    expect(spy1).toHaveBeenCalled();
  });

  it('noIsNewPokemon', () => {
    jest.spyOn(component, 'noIsNewPokemon');
    component.noIsNewPokemon();
    expect(component.isNewPokemon).toBeFalsy();
  });

  it('editPokemon', () => {
    jest.spyOn(component, 'editPokemon');
    component.editPokemon(pokemon as Pokemon);
    expect(component.pokemon).toEqual(pokemon);
  });
});
