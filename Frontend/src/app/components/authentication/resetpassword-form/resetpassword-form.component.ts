import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FirebaseAuthProvider } from 'src/app/providers/firebase/firebaseauth';
import { GlobalsProvider } from 'src/app/providers/core/globals';


@Component({
  selector: 'reset-password-form',
  templateUrl: './resetpassword-form.component.html',
  styleUrls: ['./resetpassword-form.component.scss'],
})
export class ResetpasswordFormComponent implements OnInit {
  reset_form: FormGroup = this.formBuilder.group({
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ]))
  });
  errorMessage: string;
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ]
  };
 
  constructor( 
    private auth: FirebaseAuthProvider,
    private formBuilder: FormBuilder,
    private globals: GlobalsProvider) { }
 
  ngOnInit() {
  }
 
  reset(value: any){
     this.auth.resetPassword(value)
    .then((result: any) => {
      this.globals.toastAlert('Check your email for your password reset link', {
        duration: 3000,
        cssClass: 'success'
      });
      this.globals.router.navigateByUrl('/login');
    })
    .catch((error: any) => {
      let message = null;
      if (error.code == "auth/user-not-found") {
        message = "Your email was not found in the database. Please check your email and retry again."
      }
      this.globals.toastAlert(message || JSON.stringify(error.message), {
        duration: 3000,
        cssClass: 'error'
      });
    })
  }
 
 
}
