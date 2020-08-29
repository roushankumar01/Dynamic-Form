import { FormGroup } from '@angular/forms';

export class FormFieldsModel {

    //Ui Property
    loadingText?: string
    showLoading?: boolean;
    fieldOptValueArray?: DropDownValueModel[] = [];
    fieldOptValueArrayIntermediate?: DropDownValueModel[] = [];
    fieldOptValueArrayFiltered?: DropDownValueModel[] = [];
    isDropdownDefualtPopulated?: boolean;
    


    //meta data
    //serviceURL: string;
    fieldId: number;
    tabId: number;
    seqId: string;
    levelId: number;
    dependingFields: string;
    fieldChangeAction: number;
    fieldControlName: string;
    fieldItemType: number;

    fieldOptSource: number;
    fieldOptValue: string;
    fieldOptValueAPI: string;

    //Field model property
    profileRef?: string
    //fieldName: string;
    fieldLabel: string;
    fieldDescription: string;
    fieldPlaceholder: string;
    fieldMinLength: number;
    fieldMaxLength: number;
    fieldMinValue: number;
    fieldMaxValue: number;
    //

    fieldMinDate: string;
    fieldMaxDate: string;
    fieldDateFormatToDisplay: string;
    fieldDateFormatToSendOnSubmit: string;
    
    fieldTextPattern: string;
    fieldMandatory: boolean;
    fieldCheckDefault: boolean;
    fieldDfltValue: any = '';

    fieldFileValue?: string;

    
    
    //fieldSetList: FieldSetFieldModal[];
    //fieldSetDataAll: FieldSetModal[];
}

export interface DropDownValueModel{
    id: string;
    typeId: number;
    value: string;
    parentId: number;
}

export interface FromFieldsByTabsModel {
    tabsFormGroup: FormGroup;
    tabsLabel: string;
    tabsId: number;
    tabsFormFields: FormFieldsModel[];
  }

  export interface FormModel{
      formId: number;
      formName: string;
      formImage: string;
      formDes?: string
  }



  