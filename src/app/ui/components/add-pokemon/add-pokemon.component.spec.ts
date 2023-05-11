import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PokemonService } from '../../../aplication/use-case/pokemon.service';
import { Pokemon } from 'src/app/aplication/models/pokemon.model';
import { AddPokemonComponent } from './add-pokemon.component';
import { ReactiveFormsModule } from '@angular/forms';

const pokemon = {
  id: 177,
  name: 'charmeleon',
  image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/005.png',
  attack: 100,
  defense: 100,
  hp: 0,
  type: 'default',
  idAuthor: 1,
};
describe('AddPokemonComponent', () => {
  let component: AddPokemonComponent;
  let fixture: ComponentFixture<AddPokemonComponent>;
  let service: PokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [AddPokemonComponent],
      providers: [PokemonService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPokemonComponent);
    component = fixture.componentInstance;
    component.pokemon = pokemon as Pokemon;
    fixture.detectChanges();
    service = fixture.debugElement.injector.get(PokemonService);
  });

  it('should create', () => {
    component.pokemon = pokemon as Pokemon;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('createPokemon', () => {
    const spy1 = jest.spyOn(component, 'createPokemon');
    const spy2 = jest.spyOn(component as any, 'updatePokemon');

    component.createPokemon();
    expect(component.addForm.value).toBeDefined();
    expect(spy2).toHaveBeenCalled();

    const spy3 = jest.spyOn(component as any, 'createNewPokemon');
    component.pokemon.name = '';
    component.createPokemon();
    expect(spy3).toHaveBeenCalled();

    const spy5 = jest.spyOn(component as any, 'createNewPokemon').mockImplementation(() => {
      component['actualizationSuccess']('');
    });
    const spy4 = jest.spyOn(component as any, 'actualizationSuccess');
    component['createNewPokemon'](pokemon as Pokemon);
    expect(spy4).toHaveBeenCalled();
  });

  it('actualizationSuccess', () => {
    const spy1 = jest.spyOn(component as any, 'actualizationSuccess');
    component.createPokemon();
    expect(spy1).not.toHaveBeenCalled();
  });

  it('cancelAddPokemon', () => {
    const spy1 = jest.spyOn(component, 'cancelAddPokemon');
    const spy2 = jest.spyOn(component.addForm, 'reset');
    const spy3 = jest.spyOn(component.closeAddPokemon, 'emit');
    component.cancelAddPokemon();
    expect(component.isNewPokemon).toBeFalsy();
    expect(spy2).toHaveBeenCalled();
    expect(spy3).toHaveBeenCalled();
  });
});
