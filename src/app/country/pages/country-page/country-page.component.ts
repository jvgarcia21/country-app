import { Component } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";

@Component({
  selector: 'app-country-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './country-page.component.html',

})
export class CountryPageComponent { }
