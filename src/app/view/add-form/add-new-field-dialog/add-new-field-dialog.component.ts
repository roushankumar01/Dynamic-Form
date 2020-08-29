import { FormFieldsModel } from './../../../model/form-fields-model';
import { FormDataServiceService } from './../../../services/form-data-service/form-data-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-new-field-dialog',
  templateUrl: './add-new-field-dialog.component.html',
  styleUrls: ['./add-new-field-dialog.component.scss'],
})
export class AddNewFieldDialogComponent implements OnInit {

  fieldItemType: any[] = [];


  addFieldFormGroups: FormGroup = new FormGroup({})

  currentFieldData: FormFieldsModel = null
  constructor(
    public formDataSrvc: FormDataServiceService,
    private dialogRef: MatDialogRef<AddNewFieldDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) {
    console.log(dialogData)
    this.currentFieldData = dialogData.fieldData;
    this.fieldItemType = []
    for (let x in formDataSrvc.FormFieldsType) {
      this.fieldItemType.push({
        itemTypeName: x,
        itemTypeId: formDataSrvc.FormFieldsType[x]
      })
    }
    console.log(this.fieldItemType)
    this.addFormGroup()
  }

  ngOnInit(

  ) {

  }


  addFields() {
    console.log(this.addFieldFormGroups)
    console.log(this.currentFieldData)

    let returnData = {
      isFieldAdded: true,
      fieldData: this.currentFieldData
    }
    this.dialogRef.close(returnData)
  }

  closeDialog(){
    let returnData = {
      isFieldAdded: false,
      fieldData : null
    }
    this.dialogRef.close(returnData)
  }


  addFormGroup() {
    this.addFieldFormGroups.addControl('fieldId', new FormControl('', Validators.required));
    this.addFieldFormGroups.addControl('tabId', new FormControl('', Validators.required));
    this.addFieldFormGroups.addControl('fieldItemType', new FormControl('', Validators.required));

    this.addFieldFormGroups.addControl('fieldOptSource', new FormControl('', Validators.required));
    this.addFieldFormGroups.addControl('fieldOptValue', new FormControl('', Validators.required));
    this.addFieldFormGroups.addControl('fieldOptValueAPI', new FormControl('', Validators.required));

    this.addFieldFormGroups.addControl('fieldLabel', new FormControl('', Validators.required));
    this.addFieldFormGroups.addControl('fieldDescription', new FormControl('', Validators.required));
    this.addFieldFormGroups.addControl('fieldPlaceholder', new FormControl('', Validators.required));
    this.addFieldFormGroups.addControl('fieldMandatory', new FormControl('', Validators.required));
    this.addFieldFormGroups.addControl('fieldDfltValue', new FormControl('', Validators.required));


    this.addFieldFormGroups.addControl('fieldMinLength', new FormControl('', Validators.required));
    this.addFieldFormGroups.addControl('fieldMaxLength', new FormControl('', Validators.required));
    this.addFieldFormGroups.addControl('fieldMinValue', new FormControl('', Validators.required));
    this.addFieldFormGroups.addControl('fieldMaxValue', new FormControl('', Validators.required));
    this.addFieldFormGroups.addControl('fieldTextPattern', new FormControl('', Validators.required));

    this.addFieldFormGroups.addControl('fieldCheckDefault', new FormControl('', Validators.required));


    this.addFieldFormGroups.addControl('fieldMinDate', new FormControl('', Validators.required));
    this.addFieldFormGroups.addControl('fieldMaxDate', new FormControl('', Validators.required));
    this.addFieldFormGroups.addControl('fieldDateFormatToDisplay', new FormControl('', Validators.required));
    this.addFieldFormGroups.addControl('fieldDateFormatToSendOnSubmit', new FormControl('', Validators.required));
  }

}
