import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, NavParams } from '@ionic/angular';
import { GlobalsProvider } from 'src/app/providers/core/globals';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.page.html',
  styleUrls: ['./image-preview.page.scss'],
})
export class ImagePreviewPage implements OnInit {

  @ViewChild('sliderRef', { static: true }) slides: IonSlides;
  img: any;
  sliderOptions: any = {
    zoom: {
      maxRatio: 8
    }
  }
  constructor(
    private navparams: NavParams,
    private globals: GlobalsProvider
  ) { 
  }

  ngOnInit() {
    // this.slides.slideTo(this.navparams.get('key'), 10) // for gallery
    this.img = this.navparams.get('img');
  }

  zoom(zoomIn: boolean) {
    let zoom = this.slides.options.zoom;
    (zoomIn) ? zoom.in() : zoom.out()
  }

  closePage() {
    this.globals.modalCtrl.dismiss();
  }
}
