import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { authModel } from 'src/app/models/model';
import { UserProvider } from 'src/app/providers/features/users';
import { FirebaseDBProvider } from 'src/app/providers/firebase/firebasedb';
import { GlobalsProvider } from 'src/app/providers/core/globals';


@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  register_form: FormGroup = this.formBuilder.group({
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ])),
    password: new FormControl('', Validators.compose([
      Validators.minLength(5),
      Validators.required
    ])),
  });
  errorMessage: string;
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };
 
  constructor( 
    private uData: UserProvider,
    private formBuilder: FormBuilder,
    private firedb: FirebaseDBProvider,
    private globals: GlobalsProvider
  ) { }
 
  loginUser(form: authModel) {
    this.globals.showLoader({
      content: "Signing in to your account ..."
    })
    this.uData.login(form)
    .then((res: any) => {
      this.globals.closeLoader();
      if(res === "unverified") {
        this.globals.toastAlert("Your email is not verified. Please verify your email to login", {
          cssClass: 'toast-default'
        })
      } else if(res === "verified"){
        // this.globals.showLoader({
        //   content: "Cheking for your profile ..."
        // })
        this.uData.getUserInfo()
        .then((userInfo: any) => {
          this.globals.splitPaneToggle = true;
          // this.globals.closeLoader();
          this.globals.userData = userInfo;
          this.globals.storage.saveItem('userdata', this.globals.userData)
          .catch((err: any) => {
            console.log(err);
          })
          this.globals.config.login = true;
          this.globals.config.walkthrough = true;
          this.globals.storage.saveItem('appconfig', this.globals.config)
          .catch((err: any) => {
            console.log(err);
          })
          this.globals.router.navigateByUrl('/app/dashboard');
        })
        .catch((err: any) => {
          // this.globals.closeLoader();
          console.log("Error login ", err);
        })
      }
    })
    .catch((err: any) => {
      this.globals.closeLoader();
      console.log("Error login ", err);
    })
  }
}