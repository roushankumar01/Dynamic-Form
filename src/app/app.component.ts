import { FormModel } from './model/form-fields-model';
import { DataStorageService } from './services/data-storage/data-storage.service';
import { Component, OnInit } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularMatStyleManagerService } from './services/angular-mat-style-manager/angular-mat-style-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [

    {
      title: 'View form list',
      url: 'view-form-list',
      icon: 'paper-plane'
    }, {
      title: 'Add new form',
      url: 'add-new-form',
      icon: 'mail'
    },
    /* {
      title: 'Favorites',
      url: '/folder/Favorites',
      icon: 'heart'
    },
    {
      title: 'Archived',
      url: '/folder/Archived',
      icon: 'archive'
    },
    {
      title: 'Trash',
      url: '/folder/Trash',
      icon: 'trash'
    },
    {
      title: 'Spam',
      url: '/folder/Spam',
      icon: 'warning'
    } */
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  allFormList: FormModel[] = [];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private dataStorageSrvc: DataStorageService,
    private navCtrl: NavController,
    private readonly styleManager: AngularMatStyleManagerService
  ) {
    this.initializeApp();
  }
  private readonly stylesBasePath = `node_modules/@angular/material/prebuilt-themes/`;
  matLightThemeCss = 'assets/indigo-pink.css';
  matDarkThemeCss = 'assets/pink-bluegrey.css';
  initializeApp() {
    this.platform.ready().then(() => {
      document.body.classList.toggle('dark', true);
      document.getElementById('materialtheme').setAttribute('href', this.matDarkThemeCss)

      /* const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
      prefersDark.addListener((e) => {
        console.log(e);
        console.log('system theme change')
        document.body.classList.toggle('dark', prefersDark.matches);
      }) */
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }

    this.dataStorageSrvc.getStorage(this.dataStorageSrvc.dataStorageKeys.ALL_FORM_LIST).then((data) => {
      if (data) {
        this.allFormList = JSON.parse(data)
        console.log(this.allFormList)
      }
    })
  }

  changeTheme(event: any) {
    console.log('qf')
    if (event.detail.checked) {
      document.body.classList.add('dark');
      document.getElementById('materialtheme').setAttribute('href', this.matDarkThemeCss)
    } else {
      document.body.classList.remove('dark');
      document.getElementById('materialtheme').setAttribute('href', this.matLightThemeCss)
    }

  }
}
function changeTheme(themeName) {
  document.getElementById('themeAsset').setAttribute('href', '');
}