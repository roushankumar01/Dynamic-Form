import { FormModel } from './../../../model/form-fields-model';
import { DataStorageService } from './../../../services/data-storage/data-storage.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-view-form-list',
  templateUrl: './view-form-list.page.html',
  styleUrls: ['./view-form-list.page.scss'],
})
export class ViewFormListPage implements OnInit {

  allFormList: FormModel[] = []
  constructor(
    private dataStorageSrvc: DataStorageService,
    private navCtrl: NavController
  ) {

    dataStorageSrvc.getStorage(dataStorageSrvc.dataStorageKeys.ALL_FORM_LIST).then( (data:any) => {
      if(data){
        this.allFormList = JSON.parse(data)
        console.log(this.allFormList);
      } else {
        //alert('No form found');
      }
    })

  }

  ngOnInit() {

  }

  editForm(formId){
    this.navCtrl.navigateForward('add-or-edit-fields/' + formId)
  }
  applyForm(formId){
    this.navCtrl.navigateForward('apply-form/' + formId)
  }
}
