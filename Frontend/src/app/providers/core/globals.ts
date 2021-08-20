import { Injectable } from '@angular/core';
import { AlertController, 
  ModalController, 
  ToastController, 
  LoadingController,
  ActionSheetController,
  Platform
} from '@ionic/angular';
import { ImageLoaderConfigService } from 'ionic-image-loader';
import { StorageProvider } from './storage';
import { appConfig } from '../../models/model';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Router } from '@angular/router';

declare var $ :any;

@Injectable()
export class GlobalsProvider 
{
  os: any = (this.platform.is("ios")) ? 'ios' : this.platform.is("android") ? 'android' : (!this.platform.is('cordova')) ? 'web' : 'others' ;
  loader: boolean = false;
  load: any;
  config: appConfig = {
    walkthrough: false,
    login: false,
    access: "user"
  };
  fullScreen: boolean;
  userData: any;
  splitPaneToggle: boolean = false;

  constructor(
    private imageLoaderConfig: ImageLoaderConfigService,
    public platform: Platform,
    public loading: LoadingController,
    public alertCtrl: AlertController, 
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public storage: StorageProvider,
    public actionSheetCtrl: ActionSheetController,
    public notify: LocalNotifications,
    public router: Router
  ){

  }

  public imagePreloadConfig() {
    this.imageLoaderConfig.setCacheDirectoryName('my-custom-cache-directory-name');
    this.imageLoaderConfig.enableSpinner(true);
    this.imageLoaderConfig.setConcurrency(10);
    this.imageLoaderConfig.useImageTag(true);
    this.imageLoaderConfig.debugMode = true;
    this.imageLoaderConfig.setMaximumCacheAge(7 * 24 * 60 * 60 * 1000);
    this.imageLoaderConfig.setImageReturnType('base64');
    // imageLoader.preload('http://path.to/image.jpg');
    // this.imageLoaderConfig.setFallbackUrl('assets/fallback.png');
  }

  toggleMenu() {
    this.splitPaneToggle = (this.splitPaneToggle) ? false : true ;
  }

  checkDevice() {
    // this.platform.is('cordova') && 
    // console.log("Device height ",window.screen.height);
    // console.log("Device width ",window.screen.width);
    // console.log("Device orientation ",window.screen['orientation']);
    if(window.screen.width < 600) {
      return "nativephone";
    } else {
      return 'others';
    }
  }

  async showLoader({ cssClass = '', content = null, dismissOnPageChange = true } = {}) {
    this.load = await this.loading.create({
      message: content,
      translucent: true,
      spinner: 'dots',
      keyboardClose: true,
      cssClass: cssClass
    });
    this.load.present();
  }

  closeLoader() {
    this.load.dismiss();
  }

  async notifyAlert(title: string = "Error", message) {
    let alert = await this.alertCtrl.create({
      header: title,
      subHeader: message,
      buttons: ['Close']
    });
    alert.present();
  }

  async toastAlert(message: string, { duration = 3000, cssClass = "toast-deafult" } = {}) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: duration,
      cssClass: cssClass
    });
    toast.present();
  }

  convertToThousand(amount) {
    return (parseInt(amount) * 100).toString();
  }

  getUserData = async (): Promise<any> =>
  {
    return await new Promise((resolve, reject) => {
      this.storage.getItem("userdata")
      .then((user: any) => { 
        this.config.login = (user == null) ? false : true;
        this.userData = (user == null) 
          ? this.userData
        : user;
        resolve(this.userData);
      })
      .catch((err) => { reject(err) });
    });
  }

  objectToArray = (obj: object) => {
    var array = [], tempObject;
    for (var key in obj) 
    {
        tempObject = obj[key];
        if (typeof obj[key] == "object") {
            tempObject = this.objectToArray(obj[key]);
        }
        array[key] = tempObject;
    }
    return array;
  }

  cutString(text: string, len: number) {    
      text = $($.parseHTML(text)).text();
      var i = 0;
      var wordsToCut = len;
      var wordsArray = text.split("");
      if(wordsArray.length>wordsToCut){
          var strShort = "";
          for(i = 0; i < wordsToCut; i++){
              strShort += wordsArray[i] + "";
          }   
          return strShort+"...";
      }else{
          return text;
      }
  }

  arrayToObject = (arr = []) =>
  {
      var rv = {};
      for (var i = 0; i < arr.length; ++i)
        rv[i] = arr[i];
      return rv;
  }

  doRefresh($ent) {
    setTimeout(() => {
      console.log('Async operation has ended');
      $ent.target.complete();
    }, 2000);
  }

  navigate(path: string, subpage: boolean = false) {
    let route = this.router;
    (subpage)
    ? route.navigate([path])
    : route.navigateByUrl(path);
  }
}
