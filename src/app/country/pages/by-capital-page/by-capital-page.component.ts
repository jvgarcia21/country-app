import { CountryService } from './../../services/country.service';
import { Component, inject, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { rxResource } from '@angular/core/rxjs-interop';

import { Country } from '../../interfaces/country.interface';
import { firstValueFrom, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',

})
export class ByCapitalPageComponent {

  CountryService = inject(CountryService);



  activatedRoute = inject(ActivatedRoute);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';


  query = signal(this.queryParam);

  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      console.log({ query: request.query })


      if (!request.query) return of([]);


      return this.CountryService.searchByCapital(request.query)

    }
  })
  // countryResource = resource({
  //     request: () => ({ query: this.query() }),
  //     loader: async ({ request }) => {


  //       if (!request.query) return [];

  //       return await firstValueFrom(
  //         this.CountryService.searchByCapital(request.query)
  //       )
  //     }
  //   })


  // isLoading = signal(false);
  // isError = signal<string | null>(null);
  // countries = signal<Country[]>([]);



  // onSearch(query: string) {
  //   if (this.isLoading()) return;
  //   this.isLoading.set(true);
  //   this.isError.set(null);


  //   this.CountryService.searchByCapital(query)
  //     .subscribe({
  //       next: (countries) => {


  //         this.isLoading.set(false);
  //         this.countries.set(countries);




  //       },
  //       error: (err) => {
  //         this.isLoading.set(false);
  //         this.isError.set('No se encontro un pais con esa capital');
  //         this.countries.set([]);
  //       }
  //     })

}





