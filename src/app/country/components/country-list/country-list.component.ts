import { DecimalPipe } from '@angular/common';
import { Country } from '../../interfaces/country.interface';

import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'country-list',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './country-list.component.html',

})
export class CountryListComponent {



  countries = input.required<Country[]>();

}
