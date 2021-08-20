import { Component } from '@angular/core';

/**
 * Generated class for the ErrorComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'error',
  templateUrl: 'error.html'
})
export class ErrorComponent {

  text: string;

  constructor() {
    console.log('Hello ErrorComponent Component');
    this.text = 'Hello World';
  }

}
