import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { authModel } from 'src/app/models/model';
import { UserProvider } from 'src/app/providers/features/users';
import { GlobalsProvider } from 'src/app/providers/core/globals';

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent {

  errorMessage: string = '';
  successMessage: string ='';

  register_form: FormGroup = new FormGroup({
    displayName: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', Validators.compose(
      [Validators.required, Validators.minLength(4), Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])+.(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")] 
    )),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    rpassword: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });
  passwordMatch: boolean;
  validation_messages = {
    'displayName': [
      {type: 'required', message: 'Username is required'},
      {type: 'pattern', message: 'Enter a valid username'}
    ],
    'email': [
      {type: 'required', message: 'Email is required'},
      {type: 'pattern', message: 'Enter a valid email'}
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };
    

  constructor( 
    private uData: UserProvider,
    private globals: GlobalsProvider
  ) { }

  register(form: any) {
    this.globals.showLoader({
      content: "Creating your account ..."
    })
    this.uData.register(form)
    .then((res: any) => {
      this.globals.closeLoader();
      console.log(res);
      this.globals.toastAlert((res == true) ? "Veification email sent.": "Error while creating your account", {
        cssClass: 'toast-default'
      });
      if(res === true) {
        this.globals.router.navigate(['login'])
      }
    })
    .catch((err: any) => {
      this.globals.closeLoader();
      console.log(err);
    });
  }

  checkPassword() {
    this.passwordMatch = (this.register_form.controls.password.value === this.register_form.controls.rpassword.value)
      ? true
      : false;
  }
}
