import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImagePreviewPageModule } from './pages/ui/image-preview/image-preview.module';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { File } from '@ionic-native/file/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { FirebaseX } from "@ionic-native/firebase-x/ngx";
import { WebView } from '@ionic-native/ionic-webview/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { IonicImageLoader } from 'ionic-image-loader';

import * as firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/messaging';

import { firebaseConfig } from './config/config';
firebase.initializeApp(firebaseConfig);

import { StorageProvider } from './providers/core/storage';
import { GlobalsProvider } from './providers/core/globals';

import { FirebaseDBProvider } from './providers/firebase/firebasedb';
import { FirebaseStorageProvider } from './providers/firebase/firebasestore';
import { FirebaseAuthProvider } from './providers/firebase/firebaseauth';

import { UserProvider } from './providers/features/users';
import { MediaProvider } from './providers/core/media';
import { TrackService } from './providers/features/track.service';
import { StoreService } from './providers/features/store.service';
import { TmdbService } from './providers/features/tmdb.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonicModule.forRoot({
      // mode: 'ios'
    }),
    IonicStorageModule.forRoot({
      name: 'moviesAppdb',
    }),
    IonicImageLoader.forRoot(),
    AppRoutingModule,
    ServiceWorkerModule.register('combined-sw.js', { enabled: environment.production }),
    ImagePreviewPageModule,
  ],
  providers: [
    FirebaseDBProvider, FirebaseStorageProvider, FirebaseAuthProvider,
    StorageProvider, GlobalsProvider, 
    LocalNotifications, StatusBar, SplashScreen, SpinnerDialog, SocialSharing, File, Camera, FirebaseX, PhotoViewer, WebView,
    UserProvider, MediaProvider, TrackService, StoreService, TmdbService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
