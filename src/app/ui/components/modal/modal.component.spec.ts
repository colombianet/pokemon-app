import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PokemonService } from '../../../aplication/use-case/pokemon.service';
import { of } from 'rxjs';
import { Pokemon } from 'src/app/aplication/models/pokemon.model';
import { ModalComponent } from './modal.component';


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
describe('ModalComponent', () => {

  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let service: PokemonService;

  beforeEach(() => {
      TestBed.configureTestingModule({
          imports: [
              HttpClientTestingModule
          ],
          declarations: [
              ModalComponent
          ],
          providers: [
            PokemonService
          ],
          schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();
  });


  beforeEach(() => {
      fixture = TestBed.createComponent(ModalComponent);
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

  it('closeModal', () => {
    const spy1 = jest.spyOn(component, 'closeModal');
    const spy2 = jest.spyOn(component.closeModalEvent, 'emit');

    component.closeModal(true);
    expect(spy2).toHaveBeenCalledWith(true);
  });

  it('deletPokemon', () => {
    const spy1 = jest.spyOn(component, 'deletPokemon');
    component.deletPokemon();
    expect(spy1).toHaveBeenCalled();
  });
});
