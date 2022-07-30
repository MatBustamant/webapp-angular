import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  app = initializeApp(environment.firebaseConfig);
  storage = getStorage(this.app)

  constructor() { }

  async upload(name: string, imgBase64: any) {
    try {
      const path = ref(this.storage, `portfolio-images/${name}`)
      const uploadImg = await uploadString(path, imgBase64,'data_url');
      return getDownloadURL(uploadImg.ref);
    } catch (err) {
      return null;
    }
  }
}
