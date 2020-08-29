import { Injectable } from '@angular/core';
import { ToastController, LoadingController, Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {
  loading
  loadingObj
  backButtonSubscription
  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController,
    private platform: Platform
  ) { }


  parseDataForUi(date: string){
    let temp = new Date(date)
    return temp.getDate().toString().padStart(2, '0') + '-' + (temp.getMonth() + 1).toString().padStart(2, '0') + '-' + temp.getFullYear()
  }

  showToast(messge: string) {
    this.toastController.create({
      message: messge,
      duration: 2000,
      animated: true,
      cssClass: 'custom-toast',
      position: 'bottom',
      translucent: true
    }).then((obj) => {
      obj.present();
    });
  }

  isLoading: boolean = false;
  async showLoading(loadingMsg) {
    this.isLoading = true;
    this.loading = await this.loadingController.create({
      message: loadingMsg,
      backdropDismiss: false,
      showBackdrop: false,

    }).then(loadingEl => {
      this.loadingObj = loadingEl
      loadingEl.present().then((res) => {
        console.log(' Loading started', res);
        this.isLoading = true;
        this.registerBackButton();
      })
    })
    //this.loading.onDidDismiss().then(() => { this.deRegisterBackButton(); })
  }
  async dismissLoading() {
    this.isLoading = false;
    await this.loadingObj.dismiss()
    this.deRegisterBackButton();
  }


  backBtn;
  registerBackButton() {
    this.backBtn = this.platform.backButton.subscribeWithPriority(9999, () => {
      // this does work
    });
  }
  deRegisterBackButton() {
    this.backBtn.unsubscribe();
  }

  getTextFontSize(font){
    if(window.innerWidth > 390){
      return (font)+ 'px'
    } else if(window.innerWidth > 310) {
      return (font -2)+ 'px'
    } else {
      return (font -4)+ 'px'
    }
  }
}
