import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { map, Observable, catchError, throwError } from 'rxjs';
import type { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';



const API_URL = 'https://restcountries.com/v3.1';


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);




  searchByCapital(query: string): Observable<Country[]> {

    query = query.toLocaleLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      catchError(error => {
        console.log('No se pudo conseguir Pais Con ese Nombre', error);
        return throwError(() => new Error('Failed to fetch countries by capital'));
      })
    );
  };

  searchByCountry(query: string): Observable<Country[]> {

    query = query.toLocaleLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      catchError(error => {
        console.log('No se pudo conseguir Pais Con ese Nombre', error);
        return throwError(() => new Error('Failed to fetch countries '));
      })
    );
  };

}

