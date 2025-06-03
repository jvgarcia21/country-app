import { Country } from "../interfaces/country.interface";
import { RESTCountry } from "../interfaces/rest-countries.interfaces";

export class CountryMapper {

  static mapRestCountryToCountry(restCountry: RESTCountry) {


    return {
      capital: restCountry.capital.join(', '),
      cca2: restCountry.cca2,
      flag: restCountry.flag, // or use .png if you prefer
      flagSvg: restCountry.flags.svg,
      name: restCountry.name.common,
      region: restCountry.region,
      population: restCountry.population,
    }




  }

  static mapRestCountryArrayToCountryArray(restCountries: RESTCountry[]): Country[] {
    return restCountries.map(this.mapRestCountryToCountry);


  }

}
