import { Region } from './../../interfaces/region.type';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";

import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class ByRegionPageComponent {
  CountryService = inject(CountryService);
  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  selector = signal<Region | null>(null);

  countryResource = rxResource({
    request: () => ({ Region: this.selector() }),
    loader: ({ request }) => {
      if (!request.Region) return of([]);
      return this.CountryService.searchByRegion(request.Region)
    }
  })

}
