import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import CryptoJS from 'crypto-js';
import { secretKey } from '../../config/config';

@Injectable()

export class StorageProvider 
{
    secret: string = secretKey;
    constructor(
        private storage: Storage
    ) { 
    }

    encrypt(data, key) {
        return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
    }

    decrypt(data, key) {
        let bytes = CryptoJS.AES.decrypt(data, key);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }

    saveItem = (key: string, data: {}) =>
    {
        return this.storage.ready()
        .then(() => {
            return this.storage.set(
                key,
                this.encrypt(data, this.secret)
            );
        })
    }

    getItem = async (key: string):Promise<any> =>
    {
        return await new Promise((resolve, reject) => {
            this.storage.ready()
            .then(() => {
                return this.storage.get(key)
                .then((encryptedRes: any) => {
                    if(encryptedRes != null) {
                        resolve(this.decrypt(encryptedRes, this.secret));
                    } else {
                        resolve(encryptedRes);
                    }
                })
                .catch((err: any) => {
                    reject(err)
                });
            });
        });
    }

    removeItem = (key: string) =>
    {
        return this.storage.remove(key);
    }

    clear = () =>
    {
        return this.storage.clear();
    }
}