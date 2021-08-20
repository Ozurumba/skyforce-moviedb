import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/storage';

@Injectable()

export class FirebaseStorageProvider {
    ref: any = firebase.storage().ref();
    constructor() {
    }

    saveFiles = (filepath: any, file: any, callback: any) => {
        let storageTask = this.ref.child(filepath).put(file);
        storageTask.on('state_changed', (snapshot) => {
            var progress = (snapshot['bytesTransferred'] / snapshot['totalBytes']) * 100;
            switch (snapshot['state']) {
                case firebase.storage.TaskState.PAUSED:
                    callback('Upload is paused at ' + progress);
                    break;
                //   case firebase.storage.TaskState.RUNNING:
                //     callback(progress);
                //     break;
                case firebase.storage.TaskState.SUCCESS:
                    callback('Upload is successful');
                    break;
                case firebase.storage.TaskState.ERROR:
                    callback('Upload is unsuccessful');
                    break;
            }
        }, (error) => {
            switch (error['code']) {
                case 'storage/unauthorized':
                    callback("User doesn't have permission to access the object");
                    break;
                case 'storage/canceled':
                    callback("User canceled the upload");
                    break;
                case 'storage/unknown':
                    callback("Unknown error occurred, inspect error.serverResponse");
                    break;
            }
        }, () => {
            storageTask.snapshot.ref.getDownloadURL()
                .then((downloadURL) => {
                    callback(downloadURL);
                }).catch((error) => {
                    callback(error);
                });
        });
    }

    deleteFiles = (filepath: string) => {
        return this.ref.child(filepath).delete();
    }

    downloadImage = async (fileurl) => {
        return await new Promise((resolve, reject) => {
            firebase.storage().refFromURL(fileurl).getDownloadURL()
                .then((url) => {
                    var xhr = new XMLHttpRequest();
                    xhr.responseType = 'blob';
                    xhr.onload = function () {
                        var reader = new FileReader();
                        reader.onload = () => {
                            resolve(reader.result);
                        };
                        reader.readAsDataURL(xhr.response);
                    };
                    xhr.open('GET', url);
                    xhr.send();
                })
                .catch(err => {
                    reject(err.message);
                });
        })
    }

    downloadFileViaReference(refUrl): Promise<any> {
        var pathReference = firebase.storage().ref(refUrl);
        return new Promise((resolve, reject) => {
            pathReference.getDownloadURL()
                .then((url) => {
                    var xhr = new XMLHttpRequest();
                    xhr.responseType = 'blob';
                    xhr.onload = function () {
                        var reader = new FileReader();
                        reader.onload = () => {
                            resolve(reader.result);
                        };
                        reader.readAsDataURL(xhr.response);
                    };
                    xhr.open('GET', url);
                    xhr.send();
                })
                .catch(err => {
                    reject(err.message);
                });
        })
    }

    checkIfFileExistsOnlineViaReference(refUrl: any): Promise<any> {
        var pathReference = firebase.storage().ref(refUrl);
        return new Promise((resolve, reject) => {
            pathReference.getDownloadURL().then(() => {
                // file exists online
                resolve(true);
            }).catch((err) => {
                // file does not exist online
                if (err.code == "storage/object-not-found") {
                    reject(false);
                }
            })

        });
    }

    checkIfFileExistsOnline(fileurl:string):Promise<any>{
        return new Promise((resolve, reject) => {
            firebase.storage().refFromURL(fileurl).getDownloadURL()
                .then((url) => {
                    // file exists online
                resolve(true);
            }).catch((err) => {
                // file does not exist online
                if (err.code == "storage/object-not-found") {
                    reject(false);
                }
            })
        });
    }
}