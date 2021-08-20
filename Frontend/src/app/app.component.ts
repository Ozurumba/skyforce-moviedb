import { Component, OnInit } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { navRoutes } from './config/config';
import { GlobalsProvider } from './providers/core/globals';
import { FirebaseAuthProvider } from './providers/firebase/firebaseauth';
import { UserProvider } from './providers/features/users';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  public appPages = navRoutes;
  showsplash = true;
  
  constructor(
    private udata: UserProvider,
    private globals: GlobalsProvider,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
    this.globals.imagePreloadConfig();
  }

  initializeApp() {
    this.globals.platform.ready()
    .then(() => {
      this.statusBar.backgroundColorByHexString('#fff');
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      setTimeout(() => { this.showsplash = false; }, 1500);
    });
  }

  ngOnInit() {
    this.globals.getUserData()
    .then((userData: any) => {
      this.globals.userData = userData;
    });
  }

  private logout() {
    this.globals.showLoader({
      content: "loggin you out ..."
    })
    this.udata.logout()
    .then((res: any) => {
      console.log(res);
      this.globals.closeLoader();
      this.globals.splitPaneToggle = false;
      this.globals.router.navigateByUrl('login')
    })
    .catch((err: any) => {
      this.globals.closeLoader();
      console.log(err);
    });
  }

}
