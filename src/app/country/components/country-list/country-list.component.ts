import { DecimalPipe } from '@angular/common';
import { Country } from '../../interfaces/country.interface';

import { Component, input } from '@angular/core';

@Component({
  selector: 'country-list',
  imports: [DecimalPipe],
  templateUrl: './country-list.component.html',

})
export class CountryListComponent {



  countries = input.required<Country[]>();

}
