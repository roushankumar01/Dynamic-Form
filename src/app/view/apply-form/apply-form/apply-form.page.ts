import { DataStorageService } from './../../../services/data-storage/data-storage.service';
import { FormDataServiceService } from './../../../services/form-data-service/form-data-service.service';
import { ActivatedRoute } from '@angular/router';
import { FormFieldsModel, FromFieldsByTabsModel, FormModel } from './../../../model/form-fields-model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';

@Component({
  selector: 'app-apply-form',
  templateUrl: './apply-form.page.html',
  styleUrls: ['./apply-form.page.scss'],
})
export class ApplyFormPage implements OnInit {
  darkTheme: NgxMaterialTimepickerTheme = {
    container: {
      bodyBackgroundColor: '#424242',
      buttonColor: '#fff'
    },
    dial: {
      dialBackgroundColor: '#555',
    },
    clockFace: {
      clockFaceBackgroundColor: '#555',
      clockHandColor: '#9fbd90',
      clockFaceTimeInactiveColor: '#fff'
    }
  };
  //form property
  formFields: FormFieldsModel[] = [];
  formFieldsByTabs: FromFieldsByTabsModel[] = [];

  //Form Data
  formDetails: FormModel;

  fieldType = this.formDataSrvc.FormFieldsType

  renderForm: boolean = false;
  currentTab = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formDataSrvc: FormDataServiceService,
    private storageSrvc: DataStorageService,
    private http: HttpClient,
  ) {
    const formId = activatedRoute.snapshot.paramMap.get('form_id');

    if (formId) {
      storageSrvc.getStorage(storageSrvc.dataStorageKeys.ALL_FORM_LIST).then((data: any) => {
        if (data) {
          let allFormList: FormModel[] = JSON.parse(data)
          let index = allFormList.findIndex((item) => {
            return item.formId == Number(formId)
          })

          if (index !== -1) {
            this.formDetails = allFormList[index];
            storageSrvc.getStorage(storageSrvc.dataStorageKeys.FORM_FIELDS + formId).then((data: any) => {
              if (data) {
                this.formFields = JSON.parse(data);
                this.changeFormDataInTabs()
              }
              else {
                console.log('No form fields found');
              }
            })
          }
        }
      })
    } else {
      //so error
    }

  }

  ngOnInit() {

  }



  //Get saved form from local
  getSavedForm() {
    console.log('Get saved form');
    this.storageSrvc.getStorage('saved_' + String(this.formDetails.formId)).then((data) => {
      console.log(data);
      if (data) {

      } else {
        this.getForm()
      }
    }).catch(error => {
      console.log(error);
      this.getForm()

    })

  }

  getForm() {
    this.storageSrvc.getStorage('fileds_' + String(this.formDetails.formId)).then((data) => {
      console.log(data);
      if (data) {

      } else {

      }
    }).catch(error => {
      console.log(error);
    })
  }

  changeFormDataInTabs() {
    this.formFieldsByTabs = [];
    var prevTab = 1;
    let currentTabFields: any[] = [];
    let tabsLabel = '';
    let tabsId = ''
    let tabsFromGroup = new FormGroup({});
    for (let i = 0; i < this.formFields.length; i++) {
      if (prevTab === this.formFields[i].tabId) {
        currentTabFields.push(this.formFields[i])
      } else {
        let data: FromFieldsByTabsModel = {
          tabsFormGroup: tabsFromGroup,
          tabsLabel: tabsLabel,
          tabsId: (i),
          tabsFormFields: currentTabFields
        }
        this.formFieldsByTabs.push(data);
        currentTabFields = [];
        currentTabFields.push(this.formFields[i]);
        prevTab = this.formFields[i].tabId;
      }
      if (this.formFields[i].fieldItemType === this.formDataSrvc.FormFieldsType.TAB_LABEL) {
        tabsLabel = this.formFields[i].fieldLabel;
      }
      if (this.formFields.length === i + 1) {
        let data: FromFieldsByTabsModel = {
          tabsFormGroup: tabsFromGroup,
          tabsLabel: tabsLabel,
          tabsId: (i),
          tabsFormFields: currentTabFields
        }
        this.formFieldsByTabs.push(data);
      }
    }
    console.log(this.formFieldsByTabs)





    for (let tabIndex = 0; tabIndex < this.formFieldsByTabs.length; tabIndex++) {

      this.formFieldsByTabs[tabIndex].tabsFormGroup = new FormGroup({});
      for (let fieldIndex = 0; fieldIndex < this.formFieldsByTabs[tabIndex].tabsFormFields.length; fieldIndex++) {
        this.formFieldsByTabs[tabIndex].tabsFormFields[fieldIndex].showLoading = false;
        this.formFieldsByTabs[tabIndex].tabsFormGroup.addControl(String(this.formFieldsByTabs[tabIndex].tabsFormFields[fieldIndex].fieldControlName), new FormControl('', this.addValidators(this.formFieldsByTabs[tabIndex].tabsFormFields[fieldIndex])))

        if (this.formFieldsByTabs[tabIndex].tabsFormFields[fieldIndex].fieldItemType === this.fieldType.TEXT_INPUT) {

        }

        if (this.formFieldsByTabs[tabIndex].tabsFormFields[fieldIndex].fieldItemType === this.fieldType.DROPDOWN) {
          console.log('dropdown')
          this.splitOptValue(this.formFieldsByTabs[tabIndex].tabsFormFields[fieldIndex], tabIndex, fieldIndex)
        }

        if (this.formFieldsByTabs[tabIndex].tabsFormFields[fieldIndex].fieldItemType === this.fieldType.DROPDOWN_WITH_MULTIPLE_SELECTION) {

          this.splitOptValue(this.formFieldsByTabs[tabIndex].tabsFormFields[fieldIndex], tabIndex, fieldIndex)

        }

        if (this.formFieldsByTabs[tabIndex].tabsFormFields[fieldIndex].fieldItemType === this.fieldType.TEXT_INPUT_NUMBER_ONLY) {


        }

        if (this.formFieldsByTabs[tabIndex].tabsFormFields[fieldIndex].fieldItemType === this.fieldType.CHECKBOX) {


        }

        if (this.formFieldsByTabs[tabIndex].tabsFormFields[fieldIndex].fieldItemType === this.fieldType.TEXT_INPUT_READ_ONLY) {


        }

        if (this.formFieldsByTabs[tabIndex].tabsFormFields[fieldIndex].fieldItemType === this.fieldType.DATE) {


        }

        if (this.formFieldsByTabs[tabIndex].tabsFormFields[fieldIndex].fieldItemType === this.fieldType.EMAIL) {


        }

        if (this.formFieldsByTabs[tabIndex].tabsFormFields[fieldIndex].fieldItemType === this.fieldType.MOBILE_NUMBER) {


        }

        if (this.formFieldsByTabs[tabIndex].tabsFormFields[fieldIndex].fieldItemType === this.fieldType.DOCUMENTS) {


        }

        if (this.formFieldsByTabs[tabIndex].tabsFormFields[fieldIndex].fieldItemType === this.fieldType.TIME) {


        }

        if (this.formFieldsByTabs[tabIndex].tabsFormFields[fieldIndex].fieldItemType === this.fieldType.FIELD_SET) {


        }

        if (this.formFieldsByTabs[tabIndex].tabsFormFields[fieldIndex].fieldItemType === this.fieldType.LABEL) {


        }

        if (this.formFieldsByTabs[tabIndex].tabsFormFields[fieldIndex].fieldItemType === this.fieldType.TAB_LABEL) {
        }
        if (tabIndex === this.formFieldsByTabs.length - 1 && fieldIndex === this.formFieldsByTabs[tabIndex].tabsFormFields.length - 1) {
          console.log('last tab');
          this.renderForm = true
        }
      }
    }





  }

  addValidators(forField: FormFieldsModel) {
    var validators: ValidatorFn[] = [];
    if (forField.fieldItemType === this.fieldType.TEXT_INPUT) {
      if (forField.fieldMandatory === true) {
        validators.push(Validators.required)
      }
      if (forField.fieldMinLength) {
        validators.push(Validators.minLength(forField.fieldMinLength))
      }
      if (forField.fieldMaxLength) {
        validators.push(Validators.maxLength(forField.fieldMaxLength))
      }
      if (forField.fieldMinValue) {
        validators.push(Validators.min(forField.fieldMinValue))
      }
      if (forField.fieldMinValue) {
        validators.push(Validators.max(forField.fieldMaxValue))
      }

    }

    if (forField.fieldItemType === this.fieldType.DROPDOWN) {
      if (forField.fieldMandatory === true) {
        validators.push(Validators.required)
      }

    }

    if (forField.fieldItemType === this.fieldType.DROPDOWN_WITH_MULTIPLE_SELECTION) {
      if (forField.fieldMandatory === true) {
        validators.push(Validators.required)
      }

    }

    if (forField.fieldItemType === this.fieldType.TEXT_INPUT_NUMBER_ONLY) {

      if (forField.fieldMandatory === true) {
        validators.push(Validators.required)
      }
    }

    if (forField.fieldItemType === this.fieldType.CHECKBOX) {
      if (forField.fieldMandatory === true) {
        validators.push(Validators.required)
      }

    }

    if (forField.fieldItemType === this.fieldType.TEXT_INPUT_READ_ONLY) {
      if (forField.fieldMandatory === true) {
        validators.push(Validators.required)
      }

    }

    if (forField.fieldItemType === this.fieldType.DATE) {
      if (forField.fieldMandatory === true) {
        validators.push(Validators.required)
      }

    }

    if (forField.fieldItemType === this.fieldType.EMAIL) {

      if (forField.fieldMandatory === true) {
        validators.push(Validators.required)
      }
      validators.push(Validators.email)
    }

    if (forField.fieldItemType === this.fieldType.MOBILE_NUMBER) {

      if (forField.fieldMandatory === true) {
        validators.push(Validators.required)
      }
      validators.push(Validators.pattern(/^[1-9]\d{9}$/))
    }

    if (forField.fieldItemType === this.fieldType.DOCUMENTS) {
      if (forField.fieldMandatory === true) {
        validators.push(Validators.required)
      }

    }

    if (forField.fieldItemType === this.fieldType.TIME) {
      if (forField.fieldMandatory === true) {
        validators.push(Validators.required)
      }

    }

    if (forField.fieldItemType === this.fieldType.FIELD_SET) {
      if (forField.fieldMandatory === true) {
        validators.push(Validators.required)
      }

    }

    if (forField.fieldItemType === this.fieldType.LABEL) {


    }

    if (forField.fieldItemType === this.fieldType.TAB_LABEL) {


    }

    return validators;
  }



  splitOptValue(fieldValue: FormFieldsModel, tabIndex, fieldIndex) {
    let formFieldOptionsSource = this.formDataSrvc.FormFieldOptionsSource
    if (fieldValue.fieldItemType === this.fieldType.DROPDOWN || fieldValue.fieldItemType === this.fieldType.DROPDOWN_WITH_MULTIPLE_SELECTION) {

      if (fieldValue.fieldOptSource === formFieldOptionsSource.FROM_JSON_OBJ) {

        this.formFieldsByTabs[tabIndex].tabsFormFields[fieldIndex].fieldOptValueArray = JSON.parse(this.formFieldsByTabs[tabIndex].tabsFormFields[fieldIndex].fieldOptValue);
        this.formFieldsByTabs[tabIndex].tabsFormFields[fieldIndex].fieldOptValueArrayIntermediate = this.formFieldsByTabs[tabIndex].tabsFormFields[fieldIndex].fieldOptValueArray;
        if (fieldValue.isDropdownDefualtPopulated) {
          this.formFieldsByTabs[tabIndex].tabsFormFields[fieldIndex].fieldOptValueArrayFiltered = this.formFieldsByTabs[tabIndex].tabsFormFields[fieldIndex].fieldOptValueArray;
        }

      }

      if (fieldValue.fieldOptSource === formFieldOptionsSource.FROM_API) {
        this.http.get(fieldValue.fieldOptValueAPI).subscribe((res: any) => {
          this.formFieldsByTabs[tabIndex].tabsFormFields[fieldIndex].fieldOptValueArray = res
          this.formFieldsByTabs[tabIndex].tabsFormFields[fieldIndex].fieldOptValueArrayIntermediate = this.formFieldsByTabs[tabIndex].tabsFormFields[fieldIndex].fieldOptValueArray;
          if (!fieldValue.isDropdownDefualtPopulated) {
            this.formFieldsByTabs[tabIndex].tabsFormFields[fieldIndex].fieldOptValueArrayFiltered = this.formFieldsByTabs[tabIndex].tabsFormFields[fieldIndex].fieldOptValueArray;
          }
        })

      }



    }

    if (fieldValue.fieldItemType === this.fieldType.DOCUMENTS) {

    }

  }


  submitForm() {

  }




  fieldChangeAction(fieldData: FormFieldsModel, event, tabIndex, fieldIndex) {

  }



  nextStep() {
    this.currentTab++;
  }

  prevStep() {
    this.currentTab--;
  }



  setStep(index: number) {
    this.currentTab = index;
  }
}
