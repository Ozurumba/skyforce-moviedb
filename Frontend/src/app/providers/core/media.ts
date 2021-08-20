import { Injectable } from '@angular/core';
import { FirebaseStorageProvider } from '../firebase/firebasestore';
import { File } from '@ionic-native/file/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { GlobalsProvider } from './globals';
import { fileModel } from '../../models/model';
import * as imgUtil from 'blob-util';
// import { canvasToBlob, imgUtil } from 'blob-util';
import { photoviewerConfig } from 'src/app/config/config';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { ImagePreviewPage } from 'src/app/pages/ui/image-preview/image-preview.page';
declare var $: any;

@Injectable()
export class MediaProvider {
  type: string = ('video' || 'audio' || 'image')
  preview: boolean = false;
  mediaFile: fileModel = {
    name: null,
    size: null,
    data: null,
    path: null
  };
  progressVal:number;

  constructor(
    private firestore: FirebaseStorageProvider,
    private photoviewer: PhotoViewer,
    private globals: GlobalsProvider,
    private file: File,
    private webview: WebView,
    private camera: Camera
  ) {
  }

  public async getPicture() {
    let actionSheet = await this.globals.actionSheetCtrl.create({
      cssClass: 'action-sheets-basic-page',
      mode: 'md',
      buttons: [
        {
          text: 'Take photo',
          role: 'destructive',
          cssClass: 'text-danger',
          icon: 'camera',
          handler: () => {
            this.captureImage(false);
          }
        },
        {
          text: 'Choose photo from Gallery',
          cssClass: 'text-success',
          icon: 'images',
          handler: () => {
            this.captureImage(true);
          }
        },
      ]
    });
    if(this.globals.platform.is('cordova')) {
      actionSheet.present();
    } else {
      console.log('web');
      $('input#' + this.type).attr('capture', 'true');
      $('input#' + this.type).click();
    }
  }

  private captureImage(useAlbum: boolean) {
    if(Camera['installed']()) {
      this.camera.getPicture({
        quality: 100,
        encodingType: this.camera.EncodingType.JPEG,
        destinationType: this.camera.DestinationType.FILE_URI,
        // mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
        // sourceType: this.camera.PictureSourceType.CAMERA,
        // saveToPhotoAlbum: true,
        // ...useAlbum ? {sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM} : {}
      }).then((fileData) => {
        // this.mediaFile.data = ;
      const tempFilename = fileData.substr(fileData.lastIndexOf('/') + 1);
      const tempBaseFilesystemPath = fileData.substr(0, fileData.lastIndexOf('/') + 1);
      const newBaseFilesystemPath = this.file.dataDirectory;
      this.mediaFile = {
        name: tempFilename,
        path: this.webview.convertFileSrc(newBaseFilesystemPath + tempFilename),
        size: null,
        data: null
      }
      return this.file.copyFile(tempBaseFilesystemPath, tempFilename, newBaseFilesystemPath, tempFilename);
      }, (err) => {
        this.globals.toastAlert('Unable to take photo');
      })
    } else {
      this.globals.toastAlert('Camera plugin not found')
    }
  }

  public onFileChange(event: any) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        const tempBaseFilesystemPath = (e.target as any).result.substr(0, (e.target as any).result.lastIndexOf('/') + 1);
        this.mediaFile = {
          name: event.target.files[0].name,
          path: (e.target as any).result,
          data: (e.target as any).result,
          size: event.target.files[0].size
        }
        this.saveToDir(
          imgUtil.dataURLToBlob(this.mediaFile.path),
          tempBaseFilesystemPath,
          this.mediaFile.name
        )
        .then((res: any) => {
          console.log(res)
        })
        .catch((err: any) => {
          console.log(err);
        })
      }
    } else {
      this.globals.toastAlert("Couldn't process image ..");
    }
  }
  
  //here is the method is used to write a file in storage  
  async saveToDir(fileBlob: Blob, folderName: string, fileName: any) { 
    // here iam mentioned this line this.file.externalRootDirectory is a native pre-defined file path storage. You can change a file path whatever pre-defined method.  
    let filePath = this.file.dataDirectory;  
    const imgString: any = await imgUtil.blobToBase64String(fileBlob);
    console.log(filePath + folderName);
    return await this.file.writeFile(
      filePath + folderName, 
      fileName, 
      fileBlob, 
      this.getContentType(imgString)
    );
  }
  
  private getContentType(base64Data: any) {  
    let block = base64Data.split(";");  
    let contentType = block[0].split(":")[1];  
    return contentType;  
  }  

  previewImage(image: string, key: number = 0) {
    if(this.globals.platform.is('cordova')) {
      try {
        this.globals.platform.ready()
        .then(() => {
          this.photoviewer.show(image, 'Image', photoviewerConfig)
        })
        .catch((ex: any) => {
          throw(ex)
        })
      } catch(ex) {
        this.globals.toastAlert(ex.message || ex.error || JSON.stringify(ex))
      }
    } else {
      console.log('web');
      this.globals.modalCtrl.create({
        component: ImagePreviewPage,
        componentProps: {
          img: image,
          key: key
        }
      })
      .then((modal: any) => {
        modal.present();
      })
      .catch((err: any) => {
        this.globals.toastAlert(err.error || err.message || JSON.stringify(err), {
          cssClass: 'toast-error'
        })
      });
    };
  }

  downloadMedia(url: string): Promise<any> {
    return this.firestore.downloadFileViaReference(url);
  }
}

