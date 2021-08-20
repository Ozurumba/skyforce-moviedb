import { Component, OnInit } from '@angular/core';
import { GlobalsProvider } from 'src/app/providers/core/globals';

@Component({
  selector: 'app-tab-menu',
  templateUrl: './tab-menu.page.html',
  styleUrls: ['./tab-menu.page.scss'],
})
export class TabMenuPage implements OnInit {

  hideTabs: boolean = true;
  tabsPlacement: string = 'top';
  tabsLayout: string = 'icon-top';
  constructor(
    private globals: GlobalsProvider,
  ) {
    this.globals.fullScreen = true;
  }

  ngOnInit() {
    if (!this.globals.platform.is('mobile')) {
      this.globals.splitPaneToggle = true;
      this.tabsPlacement = 'top';
      this.tabsLayout = 'icon-start';
      this.hideTabs = true;
      this.globals.router.navigateByUrl("overview")
    } 
  }

}
