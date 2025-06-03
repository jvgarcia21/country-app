import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent, SearchInputComponent],
  templateUrl: './by-region-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByRegionPageComponent {
  countryService = inject(CountryService);
  countries = signal<Country[]>([]);

  onSearch(query: string) {
    this.countryService.searchByCapital(query).subscribe((countries) => {
      this.countries.set(countries);
    });
  }
}
