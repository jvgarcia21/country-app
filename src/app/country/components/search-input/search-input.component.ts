import { Component, output, input, signal, effect } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',

})
export class SearchInputComponent {
  value = output<string>();


  inputValue = signal<string>('');

  debounceEffect = effect((onCleanup) => {

    const value = this.inputValue();

    const timeout = setTimeout(() => {
      this.value.emit(value);
    }
      , 500);

    onCleanup(() => {
      clearTimeout(timeout);
    });


  })
}
