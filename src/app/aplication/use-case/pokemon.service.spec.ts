import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { environment } from '../../../environments/environment';
import { PokemonService } from './pokemon.service';
import { Pokemon } from '../models/pokemon.model';

const pokemons = [
  {
    id: 177,
    name: 'charmeleon',
    image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/005.png',
    attack: 100,
    defense: 100,
    hp: 0,
    type: 'default',
    idAuthor: 1,
  },
  {
    id: 178,
    name: 'charizard',
    image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/006.png',
    attack: 75,
    defense: 86,
    hp: 33,
    type: 'Original',
    idAuthor: 1,
  },
  {
    id: 179,
    name: 'squirtle',
    image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/007.png',
    attack: 39,
    defense: 82,
    hp: 14,
    type: 'Original',
    idAuthor: 1,
  },
];

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
describe('PokemonService', () => {
  let service: PokemonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(() => {
    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // afterEach( () => {
  //     jest.resetAllMocks();
  // });

  // afterAll( () => {
  //     httpMock.verify();
  // });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('getPokemons', () => {
    service.getPokemons().subscribe((resp: Pokemon[]) => {
      expect(resp).toEqual(pokemons);
    });

    const req = httpMock.expectOne(environment.baseURL + '?idAuthor=1');
    expect(req.request.method).toBe('GET');
    req.flush(pokemons);
  });

  it('getPokemonByID', () => {
    service.getPokemonByID(177).subscribe((resp: Pokemon) => {
      expect(resp).toEqual(pokemon);
    });

    const req = httpMock.expectOne(environment.baseURL + '/177');
    expect(req.request.method).toBe('GET');
    req.flush(pokemon);
  });

  it('updatePokemonByID', () => {
    service
      .updatePokemonByID(177, pokemon as Pokemon)
      .subscribe((resp: Pokemon) => {
        expect(resp).toEqual(pokemon);
      });

    const req = httpMock.expectOne(environment.baseURL + '/177');
    expect(req.request.method).toBe('PUT');
    req.flush(pokemon);
  });

  it('createPokemon', () => {
    service.createPokemon(pokemon as Pokemon).subscribe((resp: Pokemon) => {
      expect(resp).toEqual(pokemon);
    });

    const req = httpMock.expectOne(environment.baseURL);
    expect(req.request.method).toBe('POST');
    req.flush(pokemon);
  });

  it('deletePokemonById', () => {
    service.deletePokemonById(177).subscribe((resp) => {
      expect(resp).toEqual(null);
    });

    const req = httpMock.expectOne(environment.baseURL + '/177');
    expect(req.request.method).toBe('DELETE');
    req.flush(pokemon);
  });
});
