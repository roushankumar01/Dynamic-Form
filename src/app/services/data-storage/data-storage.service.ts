import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private storage: Storage
  ) {

  }



  setStorage(data: any, key){
    return this.storage.set(key, data).then( ()=> {
      
    })
  }

  getStorage(key: string){
    return this.storage.get(key)
  }


  dataStorageKeys = {
    ALL_FORM_LIST: 'all_form',
    FORM_FIELDS: 'form_fields',
    SAVED_FORMS: 'saved_form'
  }
}
