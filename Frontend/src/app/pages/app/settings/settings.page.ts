import { Component, OnInit } from '@angular/core';
import { MediaProvider } from 'src/app/providers/core/media';
import { GlobalsProvider } from 'src/app/providers/core/globals';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
    public media: MediaProvider,
    public globals: GlobalsProvider
  ) { }

  ngOnInit() {
    this.media.type = 'image';
  }

}
