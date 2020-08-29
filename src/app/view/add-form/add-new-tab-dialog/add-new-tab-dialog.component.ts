import { UiServiceService } from './../../../services/UiService/ui-service.service';
import { FormFieldsModel, FromFieldsByTabsModel } from './../../../model/form-fields-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { FormDataServiceService } from 'src/app/services/form-data-service/form-data-service.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddNewFieldDialogComponent } from '../add-new-field-dialog/add-new-field-dialog.component';

@Component({
  selector: 'app-add-new-tab-dialog',
  templateUrl: './add-new-tab-dialog.component.html',
  styleUrls: ['./add-new-tab-dialog.component.scss'],
})
export class AddNewTabDialogComponent implements OnInit {

  addTabFormGroups: FormGroup = new FormGroup({})
  currenTabData: FromFieldsByTabsModel = null
  constructor(
    public formDataSrvc: FormDataServiceService,
    private dialogRef: MatDialogRef<AddNewFieldDialogComponent>,
    private uiSrvc: UiServiceService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) {
    this.currenTabData = dialogData.tabData;
    this.addFormGroup()
  }

  ngOnInit() { }

  addTab() {
    if (this.addTabFormGroups.valid) {
      this.currenTabData.tabsFormFields = [this.addNewFieldSData(this.currenTabData.tabsId)];
      this.currenTabData.tabsFormFields[0].fieldItemType = this.formDataSrvc.FormFieldsType.TAB_LABEL
      this.currenTabData.tabsFormFields[0].fieldLabel = this.currenTabData.tabsLabel

      let returnData = {
        isTabAdded: true,
        tabData: this.currenTabData
      }

      this.dialogRef.close(returnData)
    } else {
      this.uiSrvc.showToast('Enter tab name first')
    }
  }

  addFormGroup() {
    this.addTabFormGroups = new FormGroup({})
    this.addTabFormGroups.addControl('tabName', new FormControl('', Validators.required));
  }

  closeDialog() {
    let returnData = {
      isTabAdded: false,
      tabData: null
    }
    this.dialogRef.close(returnData)
  }


  addNewFieldSData(tabId) {



    let currentFieldData: FormFieldsModel = {
      fieldDateFormatToDisplay: null,
      fieldDateFormatToSendOnSubmit: null,
      "fieldId": tabId,
      "tabId": tabId,
      "levelId": 1,
      "seqId": "1",
      "fieldControlName": "Appl_Data",
      "fieldLabel": null,
      "fieldDescription": null,
      "fieldPlaceholder": null,
      "fieldItemType": 9,
      "fieldMandatory": false,
      "fieldMinLength": 0,
      "fieldMaxLength": 0,
      "fieldMinValue": 0,
      "fieldMaxValue": 0,
      "fieldMinDate": null,
      "fieldMaxDate": null,
      "fieldTextPattern": null,
      "fieldOptSource": 0,
      "fieldOptValue": null,
      "fieldOptValueAPI": null,
      "fieldDfltValue": null,
      "dependingFields": null,
      "fieldChangeAction": null,
      "fieldCheckDefault": false,
      "profileRef": null,
    }
    return currentFieldData
  }

}
