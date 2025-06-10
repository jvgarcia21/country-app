import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { map, Observable, catchError, throwError, delay, of, tap } from 'rxjs';
import type { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { Region } from '../interfaces/region.type';



const API_URL = 'https://restcountries.com/v3.1';


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<Region, Country[]>();



  searchByCapital(query: string): Observable<Country[]> {

    query = query.toLocaleLowerCase();

    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query)!);
    }


    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      tap(countries => this.queryCacheCapital.set(query, countries)),
      catchError(error => {
        console.log('No se pudo conseguir Pais Con ese Nombre', error);
        return throwError(() => new Error('Failed to fetch countries by capital'));
      })
    );
  };

  searchByCountry(query: string): Observable<Country[]> {

    query = query.toLocaleLowerCase();

    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query)!);
    }

    console.log(`Llegando al servidor por ${query}`);
    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      tap(countries => this.queryCacheCountry.set(query, countries)),
      delay(3000),
      catchError(error => {
        console.log('No se pudo conseguir Pais Con ese Nombre', error);
        return throwError(() => new Error('Failed to fetch countries '));
      })
    );
  };
  searchCountryByAlphaCode(code: string) {

    const url = `${API_URL}/alpha/${code}`;

    return this.http.get<RESTCountry[]>(url).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      map(countries => countries.at(0)),
      catchError(error => {
        console.log('No se pudo conseguir Pais Con ese Nombre', error);
        return throwError(() => new Error(`No se pudo conseguir Pais Con ese codigo ${code}`));
      })
    );
  };
  searchByRegion(region: Region) {



    if (this.queryCacheRegion.has(region)) {
      return of(this.queryCacheRegion.get(region)!);
    }

    const url = `${API_URL}/region/${region}`;

    return this.http.get<RESTCountry[]>(url).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      tap(countries => this.queryCacheRegion.set(region, countries)),
      catchError(error => {
        console.log('No se pudo conseguir Paises Con esa region', error);
        return throwError(() => new Error(`No se pudo conseguir Pais Con esa region ${region}`));
      })
    );
  };

}



