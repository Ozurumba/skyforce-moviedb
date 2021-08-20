import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseStorageProvider } from '../../../providers/firebase/firebasestore';
import { FirebaseAuthProvider } from '../../../providers/firebase/firebaseauth';
import { UserProvider } from '../../../providers/features/users';
import { GlobalsProvider } from '../../../providers/core/globals';
declare var $: any;

@Component({
  selector: 'profile-info',
  templateUrl: 'profile-info.html',
  styleUrls: ['./profile-info.scss'],
})
export class ProfileInfoComponent  {
  
  validations_form: FormGroup = new FormGroup({
    photoURL: new FormControl('', [Validators.required]),
    email: new FormControl('', Validators.compose(
      [Validators.required, Validators.minLength(4) , Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])+.(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")]
    )),
    displayName: new FormControl('', [Validators.required,,Validators.pattern("[a-zA-Z]+\\s?[a-zA-Z]*\\s?[a-zA-Z]*")]),
    phoneNumber: new FormControl('', [Validators.required]),
  });
  ext: any;
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'displayName': [
      { type: 'required', message: 'Username is required.' },
      { type: 'pattern', message: 'Please enter a valid username.' }
    ],
    'phoneNumber':[
      { type: 'required', message: 'phone number is required.' },
      // { type: 'pattern', message: 'Please enter a valid Number.' }
    ]
  };
  @Output() status = new EventEmitter<string>();
  
  constructor(
    private firestore: FirebaseStorageProvider,
    private fireauth: FirebaseAuthProvider,
    private uData: UserProvider,
    private globals: GlobalsProvider,
  ) {
  }

  ngOnInit() {
    this.globals.showLoader({
      content: "Retrieving profile info ..."
    })
    this.uData.getUserInfo()
    .then((user: any) => {
      this.globals.closeLoader();
      if(user && user.phoneNumber) {
        let arr: Array<any> = user.phoneNumber.split('');
        this.ext = arr[0] + arr[1] + arr[2] + arr[3];
        delete arr[0] 
        delete arr[1]
        delete arr[2]
        delete arr[3]
        user.phoneNumber = arr.join('');
      } if(!user || user.phoneNumber == null) {
        this.ext = "+234"
      }
      if(user) {
        this.validations_form.patchValue(user);
      }
    })
    .catch((err: any) => {
      this.globals.closeLoader();
      console.log(err);
    })
  }
  
  onFileChange(event: any) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      try {
        this.firestore.saveFiles('profile/profile_image'+this.fireauth.currentUser().currentUser.uid, file, (url) => {
          this.validations_form.patchValue({'photoURL': url});
        });
        // loader.dismiss();
      } catch(ex) {
        console.log("Error while uploading profile image is",ex)
        // loader.dismiss();
        // this.globals.toastAlert(ex.message);
      }
    } else {
      // loader.dismiss();
      this.globals.toastAlert("File upload error ..");
    }
  }

  openImage() {
    $('input#profile-image').click();
  }

  saveProfile(form: any) {
    this.globals.showLoader({
      content: "Updating profile info ..."
    })
    form.phoneNumber = this.ext + form.phoneNumber;
    this.uData.updateUserAccountInfo(form)
    .then((res: any) => {
      this.globals.closeLoader();
      this.globals.toastAlert("Profile Information updated");
      this.status.emit("updated");
    })
    .catch((err: any) => {
      this.globals.closeLoader();
      this.globals.toastAlert(err);
    })
  }


}
