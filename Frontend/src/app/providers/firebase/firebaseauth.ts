import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { authModel, userProfile } from '../../models/model';
declare var window: any;

@Injectable()

export class FirebaseAuthProvider {
  loading: any;
  firebase: any = firebase;

  constructor(
  ) {
  }

  public checkAuthState = (callback: any) => {
    firebase.auth().onAuthStateChanged(
      (user) => {
        callback(user);
      },
      (error) => {
        callback(error);
      }
    );
  }

  currentUser(): any {
    return firebase.auth();
  }

  signOut = () => {
    return firebase.auth().signOut();
  }

  public async signIn(form: authModel, type: string) {
    switch (type) {
      case 'phoneauth':
        window.appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
          'size': 'invisible',
        });
        return firebase.auth().signInWithPhoneNumber(form.number, window.appVerifier)
      case "email":
        return firebase.auth().signInWithEmailAndPassword(form.email, form.password);
      default:
    }
  }

  public async signUp(type: string, form: authModel) {
    switch (type) {
      case "email":
        return await firebase.auth().createUserWithEmailAndPassword(form.email, form.password);
      default:
    }
  }

  public updateProfile(form: any) {
    return firebase.auth().currentUser.updateProfile({
      displayName: form.displayName,
      photoURL: form.photoURL
    });
  }

  public async resetPassword(form: authModel) {
    return await firebase.auth().sendPasswordResetEmail(form.email);
  }

}
