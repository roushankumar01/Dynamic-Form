import { FormDataServiceService } from './../../../services/form-data-service/form-data-service.service';
import { AddNewTabDialogComponent } from './../add-new-tab-dialog/add-new-tab-dialog.component';
import { AddNewFieldDialogComponent } from './../add-new-field-dialog/add-new-field-dialog.component';
import { FormModel, FormFieldsModel, FromFieldsByTabsModel } from './../../../model/form-fields-model';
import { ActivatedRoute } from '@angular/router';
import { DataStorageService } from './../../../services/data-storage/data-storage.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-or-edit-fields',
  templateUrl: './add-or-edit-fields.page.html',
  styleUrls: ['./add-or-edit-fields.page.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AddOrEditFieldsPage implements OnInit {
  formDetails: FormModel
  allFormFields: FormFieldsModel[] = []
  noFormFieldsFound = false

  formFieldsByTabs: FromFieldsByTabsModel[] = []

  dataSource: FromFieldsByTabsModel[]

  columnsToDisplayForTabs = ['field_id', 'field_name', 'field_item_type'];

  fieldItemType: any[] = [];

  expandedElement: FromFieldsByTabsModel | null;
  constructor(
    private dataStorageSrvc: DataStorageService,
    private activatedRoute: ActivatedRoute,
    private changeDetectorRefs: ChangeDetectorRef,
    private dialog: MatDialog,
    public formDataSrvc: FormDataServiceService
  ) {
    const formId = activatedRoute.snapshot.paramMap.get('form_id');
    this.fieldItemType = []
    for (let x in formDataSrvc.FormFieldsType) {
      this.fieldItemType.push({
        itemTypeName: x,
        itemTypeId: formDataSrvc.FormFieldsType[x]
      })
    }
    if (formId) {

      dataStorageSrvc.getStorage(dataStorageSrvc.dataStorageKeys.ALL_FORM_LIST).then((data: any) => {
        if (data) {
          let allFormList: FormModel[] = JSON.parse(data)
          let index = allFormList.findIndex((item) => {
            return item.formId == Number(formId)
          })

          if (index !== -1) {
            this.formDetails = allFormList[index];
            dataStorageSrvc.getStorage(dataStorageSrvc.dataStorageKeys.FORM_FIELDS + formId).then((data: any) => {
              if (data) {
                this.allFormFields = JSON.parse(data);
                console.log(this.allFormFields)
                this.createFromByTabs()
              }
              else {
                console.log('No form fields found');
                this.noFormFieldsFound = true
              }
            })
          }
        }
      })
    }
  }



  createFromByTabs() {
    this.formFieldsByTabs = [];
    var prevTab = 1;
    let currentTabFields: any[] = [];
    let tabsLabel = '';
    let tabsId = ''
    let tabsFromGroup = new FormGroup({});
    for (let i = 0; i < this.allFormFields.length; i++) {
      if (prevTab === this.allFormFields[i].tabId) {
        currentTabFields.push(this.allFormFields[i])
      } else {
        let data: FromFieldsByTabsModel = {
          tabsFormGroup: tabsFromGroup,
          tabsLabel: tabsLabel,
          tabsId: (i),
          tabsFormFields: currentTabFields
        }
        this.formFieldsByTabs.push(data);
        currentTabFields = [];
        currentTabFields.push(this.allFormFields[i]);
        prevTab = this.allFormFields[i].tabId;
      }
      if (this.allFormFields[i].fieldItemType === this.formDataSrvc.FormFieldsType.TAB_LABEL) {
        tabsLabel = this.allFormFields[i].fieldLabel;
      }
      if (this.allFormFields.length === i + 1) {
        let data: FromFieldsByTabsModel = {
          tabsFormGroup: tabsFromGroup,
          tabsLabel: tabsLabel,
          tabsId: (i),
          tabsFormFields: currentTabFields
        }
        this.formFieldsByTabs.push(data);
      }
    }

    console.log(this.formFieldsByTabs);
    this.dataSource = this.formFieldsByTabs


  }

  ngOnInit() {

  }

  saveFormData() {
    console.log('save form data method');
    this.allFormFields = []
    for (let index = 0; index < this.formFieldsByTabs.length; index++) {
      const element = this.formFieldsByTabs[index];
      console.log(element)
      this.allFormFields = this.allFormFields.concat(element.tabsFormFields);
    }
    console.log(this.allFormFields)

    this.dataStorageSrvc.setStorage(JSON.stringify(this.allFormFields), this.dataStorageSrvc.dataStorageKeys.FORM_FIELDS + this.formDetails.formId)
  }

  addTabs() {
    let currentTab = {
      tabsId: this.formFieldsByTabs.length + 1,
      tabsLabel: '',
      tabsFormGroup: new FormGroup({}),
      tabsFormFields: null
    }




    let dialogRef = this.dialog.open(AddNewTabDialogComponent, {
      disableClose: false,
      width: '80%',
      data: {
        idNewTab: true,
        tabData: currentTab
      }
    })

    dialogRef.afterClosed().subscribe(returnData => {
      console.log('The dialog was closed');
      console.log(returnData)
      if (returnData) {
        if (returnData.isTabAdded) {
          console.log('field added');
          this.formFieldsByTabs.push(returnData.tabData);
          this.reAssignFieldId()
          this.dataSource = [...this.formFieldsByTabs]
          console.log(this.dataSource)
        } else {
          console.log('Field not added')
        }
      }
    });


  }


  getFieldObfFormElement(element: any): FormFieldsModel {
    let formField: FormFieldsModel = element
    return formField
  }


  addFields(tabIndex) {

    let currentFieldData = this.addNewFieldSData(tabIndex)
    let dialogRef = this.dialog.open(AddNewFieldDialogComponent, {
      disableClose: false,
      width: '80%',
      data: {
        isNewField: true,
        fieldData: currentFieldData
      }
    })
    dialogRef.afterClosed().subscribe(returnData => {
      console.log('The dialog was closed');
      console.log(returnData)
      if (returnData) {
        if (returnData.isFieldAdded) {
          console.log('field added');
          this.formFieldsByTabs[tabIndex].tabsFormFields.push(returnData.fieldData)
          this.reAssignFieldId()

          // this.dataSource[tabIndex].tabsFormFields = [...this.allFormFields]
          console.log(this.dataSource)
        } else {
          console.log('Field not added')
        }
      }
    });
  }

  editFields(tabIndex, fieldData: FormFieldsModel) {

    let dialogRef = this.dialog.open(AddNewFieldDialogComponent, {
      disableClose: false,
      width: '80%',
      data: {
        isNewField: false,
        fieldData: fieldData
      }
    })
    dialogRef.afterClosed().subscribe(returnData => {
      console.log('The dialog was closed');
      console.log(returnData)
      if (returnData) {
        if (returnData.isFieldAdded) {
          console.log('field added');

          let index = this.formFieldsByTabs[tabIndex].tabsFormFields.findIndex( (item) => {
            return item.fieldId === fieldData.fieldId
          })

          if(index !== -1){
            this.formFieldsByTabs[tabIndex].tabsFormFields[index] = returnData.fieldData
            this.reAssignFieldId()
          }

          

          // this.dataSource[tabIndex].tabsFormFields = [...this.allFormFields]
          console.log(this.dataSource)
        } else {
          console.log('Field not added')
        }
      }
    });
  }



  reAssignFieldId() {
    let intialIndex = 1
    for (let tabIndex = 0; tabIndex < this.formFieldsByTabs.length; tabIndex++) {
      const elementTab = this.formFieldsByTabs[tabIndex];
      for (let fieldIndex = 0; fieldIndex < elementTab.tabsFormFields.length; fieldIndex++) {
        const elementField = elementTab.tabsFormFields[fieldIndex];
        this.formFieldsByTabs[tabIndex].tabsFormFields[fieldIndex].fieldId = intialIndex;
        this.formFieldsByTabs[tabIndex].tabsFormFields[fieldIndex].fieldControlName = 'formControl' + tabIndex+ fieldIndex
        intialIndex++
      }

      this.dataSource = this.formFieldsByTabs;
      this.allFormFields = this.formFieldsByTabs[tabIndex].tabsFormFields
      this.dataSource[tabIndex].tabsFormFields = [...this.allFormFields]
    }
  }


  addNewFieldSData(tabIndex) {

    let newFieldId = 0
    let fieldId = this.formFieldsByTabs[tabIndex].tabsFormFields[this.formFieldsByTabs[tabIndex].tabsFormFields.length - 1].fieldId + 1


    let currentFieldData: FormFieldsModel = {
      fieldDateFormatToDisplay: null,
      fieldDateFormatToSendOnSubmit: null,
      "fieldId": fieldId,
      "tabId": tabIndex + 1,
      "levelId": 1,
      "seqId": "1",
      "fieldControlName": "Appl_Data",
      "fieldLabel": null,
      "fieldDescription": null,
      "fieldPlaceholder": null,
      "fieldItemType": 1,
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

