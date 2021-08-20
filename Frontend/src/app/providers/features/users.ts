import { Injectable } from '@angular/core';
import { FirebaseDBProvider } from '../firebase/firebasedb';
import { FirebaseAuthProvider } from '../firebase/firebaseauth';
import { GlobalsProvider } from '../core/globals';
import { MediaProvider } from '../core/media';
import { appConfig } from 'src/app/models/model';
import { FirebaseStorageProvider } from '../firebase/firebasestore';
declare var window: any;
declare var $: any;

@Injectable()
export class UserProvider {

  user: any;
  userInfo: any;
  path: string = "users/";
  tries: number;
  constructor(
    private mediaProv: MediaProvider,
    private firedb: FirebaseDBProvider,
    private fireauth: FirebaseAuthProvider,
    private firestore: FirebaseStorageProvider,
    private globals: GlobalsProvider,
  ) {
  }

  async logout() {
    return new Promise((resolve, reject) => {
      try {
        this.fireauth.signOut()
        .then((res: any) => {
          this.globals.storage.clear()
          .catch((err: any) => {
            reject(err);
          });
          resolve(res);
        }) 
        .catch((err: any) => {
          reject(err);
        });
      } catch(ex) {
        reject(ex);
      }
    });
  }

  async isLoggedOn() {
    return new Promise((resolve, reject) => {
      this.globals.storage.getItem('appconfig')
      .then((config: appConfig) => {
        this.globals.config = (!config) ? this.globals.config : config;
        if(this.globals.config.login && this.globals.config.walkthrough) {
          this.globals.fullScreen = true;
          resolve(true);
        } else {
          this.fireauth.checkAuthState((user: any) => {
            if(!user) {
              reject(false);
            } else {
              resolve(true);
            }
          });
          reject(false)
        }
      })
      .catch(() => {
        reject(false)
      })
    })
  }

  async getUserInfo() {
    return await new Promise((resolve, reject) => {
      this.fireauth.checkAuthState((user: any) => {
        if (user != null) {
          console.log(user);
          resolve(user);
        } else {
          reject("User not found");
        }
      });
    });
  }

  async updateUserAccountInfo(account: any) {
    return await new Promise((resolve, reject) => {
      this.fireauth.updateProfile(account)
      .then((res: any) => {
        console.log(res);
        this.globals.storage.saveItem("userdata", account);
        this.globals.toastAlert("Profile Information updated", {
          duration: 3000,
          cssClass: 'success'
        });
        resolve('profile updated');
      })
      .catch((err: any) => {
        console.log(err);
      });
    })
  }

  uploadProfileImage(callback: any) {
    this.fireauth.checkAuthState((user: any) => {
      if(user.uid) {
        if(!this.mediaProv.mediaFile.data) {
          this.globals.toastAlert("No image file content to be uploaded", {
            cssClass: "error",
            duration: 3000,
          })
          callback('failed');
        } else {
          this.firestore.saveFiles(
            "profile/" + user.uid,
            this.mediaProv.mediaFile.data, (res: any) => {
              callback(res);
          })
        }
      }
    })
  }

  private async sendVerificationEmail(): Promise<any> {
    return await new Promise((resolve, reject) => {
      let user = this.fireauth.currentUser().currentUser;
      if (user != null) {
        if (!user.emailVerified) {
          user
            .sendEmailVerification()
            .then((res: any) => {
              resolve(true);
            })
            .catch(error => {
              reject(error)
            });
        } else {
          resolve(false);
        }
      }
    })

  }

  private checkIfUserIsVerified(res: any): string {
    if (res != null) {
      if (res.emailVerified === false) {
        this.user.sendEmailVerification()
        .catch(err => {
          return err.message || err.error || JSON.stringify(err);
        })
        return "unverified";
      } else {
        try {
          return 'verified';
        } catch (err) {
          return err.message || err.error || JSON.stringify(err);
        }
      }
    }
  }

  private lockAfterTries() {
    this.tries = this.tries + 1;
    this.globals.storage.saveItem("locklogin", this.tries);
    this.globals.toastAlert('You have ' + (3 - this.tries) + ' login attempts left');

    // Reset after 3minutes
    setTimeout(() => {
      this.tries = 0;
      this.globals.storage.removeItem("locklogin");
    }, 180000);
  }

  forgot(form: any) {
    this.fireauth.resetPassword(form)
    .then((result) => {
      this.globals.toastAlert('Check your email for your password reset link', {
        duration: 3000,
        cssClass: 'success'
      });
    })
    .catch((error) => {
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

  async login(form: any) {
    return new Promise((resolve, reject) => {
      if (this.tries >= 3) {
        this.globals.toastAlert('You have your exceed login attempts. Try again in 3 minutes.');
        reject('locked');
      } else {
        this.fireauth.signIn(form, 'email')
        .then((res: any) => {
          // this.globals.userData.uid = this.fireauth.currentUser().currentUser.uid;
          this.userInfo = this.fireauth.currentUser().currentUser;
          resolve(this.checkIfUserIsVerified(res));
        })
        .catch((err: any) => {
          if (err['code'] == 'auth/wrong-password') {
            this.lockAfterTries();
            this.globals.toastAlert('The password is invalid or the user does not have a password.');
          } else if (err['code'] == 'auth/user-not-found') {
            this.globals.toastAlert('The user with this email does not exist. Kindly register.');
          }
          reject("Failed");
        });
      }
    });
  }

  async register(form: any) {
    return await new Promise((resolve, reject) => {
      this.fireauth.signUp("email", form)
      .then((res: any) => {
        resolve(this.sendVerificationEmail());
      })
      .catch((err: any) => {
        this.globals.toastAlert(err.message, {
          duration: 3000
        });
        reject('error');
      });
    });
  };

}