import { Component, OnInit } from '@angular/core';
import { GlobalsProvider } from 'src/app/providers/core/globals';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage {

  constructor(
    public globals: GlobalsProvider
  ) {
  }

  navigate(path: string) {
    this.globals.router.navigateByUrl(path);
  }

}
