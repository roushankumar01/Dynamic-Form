import { UiServiceService } from './../../../services/UiService/ui-service.service';
import { NavController } from '@ionic/angular';
import { Device } from '@ionic-native/device/ngx';
import { DataStorageService } from './../../../services/data-storage/data-storage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormModel } from './../../../model/form-fields-model';
import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
@Component({
  selector: 'app-add-new-form',
  templateUrl: './add-new-form.page.html',
  styleUrls: ['./add-new-form.page.scss'],
})
export class AddNewFormPage implements OnInit {


  newFormData: FormModel = {
    formId: 0,
    formName: '',
    formImage: ''
  }
  formGroup: FormGroup = new FormGroup({});
  constructor(
    private dataStorageSrvc: DataStorageService,
    private device: Device,
    private camera: Camera,
    private navCtrl: NavController,
    private uiSrvc: UiServiceService
  ) { }

  showSavingFormLoading = false

  ngOnInit() {
    this.setFormGroup()
  }


  setFormGroup() {
    this.formGroup.addControl("form_name", new FormControl('', Validators.required));
    this.formGroup.addControl("form_des", new FormControl('', Validators.required))
  }

  addForm() {
    if (this.formGroup.valid) {
      if(this.newFormData.formImage){
      this.showSavingFormLoading = true
      this.newFormData.formId = Math.floor(1000 + Math.random() * 9000);
      this.newFormData.formName = this.formGroup.get('form_name').value;
      this.newFormData.formDes = this.formGroup.get('form_des').value;
      this.dataStorageSrvc.getStorage(this.dataStorageSrvc.dataStorageKeys.ALL_FORM_LIST).then((data: any) => {
        if (data) {
          let allFormList: FormModel[] = JSON.parse(data);
          allFormList.push(this.newFormData);
          this.dataStorageSrvc.setStorage(JSON.stringify(allFormList), this.dataStorageSrvc.dataStorageKeys.ALL_FORM_LIST)
        } else {
          let allFormList: FormModel[] = [];
          allFormList.push(this.newFormData);
          this.dataStorageSrvc.setStorage(JSON.stringify(allFormList), this.dataStorageSrvc.dataStorageKeys.ALL_FORM_LIST)
        }
        this.navCtrl.navigateBack('add-or-edit-fields/' + this.newFormData.formId);
        this.showSavingFormLoading = true

      })
    } else {
      this.uiSrvc.showToast('Add form image first');
    }
    } else {
      this.uiSrvc.showToast('Please enter required fields first');
    }
  }



  uploadProfilePicture(textInputRef: any) {
    console.log('uploadProfilePicture running');

    if (this.device.platform === 'Android' || this.device.platform === 'Ios' || this.device.platform === 'iOS') {
      console.log('Mobile')
      this.pickImage()
    }
    else {
      const reader = new FileReader;
      console.log('Web')
      textInputRef.click();
    }
  }




  onFileChosen(event: Event) {
    const pickedFile = (event.target as HTMLInputElement).files[0];
    if (!pickedFile) {
      alert('No file is selected');
    } else {

      const fr = new FileReader();
      fr.onload = (file: any) => {
        if (pickedFile.type === 'image/jpeg' || pickedFile.type === 'image/png' || pickedFile.type === 'image/jpeg') {
          if (pickedFile.size < 1e+6) {
            let compressedImage = fr.result
            const dataUrl = fr.result.toString();
            //console.log(dataUrl)
            this.newFormData.formImage = dataUrl
          } else {
            console.log('Please select image less then 1MB')
          }
        } else {
          console.log('Only Image is Allowed')
        }
      };
      fr.readAsDataURL(pickedFile);
    }
  }

  pickImage() {
    const options: CameraOptions = {
      quality: 50,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.newFormData.formImage = base64Image


      //
      //this.userDetails.userPhoto = 'data:image/jpeg;base64,' + imageData;
      //this.compressImage()
    }, (err) => {
      // Handle error
    });
  }

}
