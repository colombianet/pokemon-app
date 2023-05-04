import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private baseURL = environment.baseURL;
  constructor( private http: HttpClient ) { }

  getPokemons(): Observable<Pokemon[]> {
    const params = new HttpParams().set('idAuthor', 1);
    return this.http.get<Pokemon[]>( this.baseURL, { params } );
  }

  getPokemonByID( id: number ): Observable<Pokemon> {
    const url = `${ this.baseURL }/${ id }`;
    return this.http.get<Pokemon>( url );
  }

  updatePokemonByID( id: number, pokemon: Pokemon ): Observable<Pokemon> {
    const url = `${ this.baseURL }/${ id }`;
    return this.http.put<Pokemon>( url, pokemon );
  }

  createPokemon( pokemon: Pokemon ): Observable<Pokemon> {
    return this.http.post<Pokemon>( this.baseURL, pokemon );
  }

  deletePokemonById( id: number ) {
    const url = `${ this.baseURL }/${ id }`;
    return this.http.delete( url );
  }
}
