import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalsProvider } from 'src/app/providers/core/globals';
import { ProfileInfoComponent } from 'src/app/components/authentication/profile-info/profile-info';
declare var $: any;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  @ViewChild(ProfileInfoComponent, {static: true}) profile: ProfileInfoComponent;
  constructor(
    public globals: GlobalsProvider
  ) { }

  ngOnInit() {
  }

  submit() {
    $('ion-button[type=submit].profile.hidden').click();
  }

}
