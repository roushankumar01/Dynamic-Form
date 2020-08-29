import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddNewFormPage } from './add-new-form.page';

describe('AddNewFormPage', () => {
  let component: AddNewFormPage;
  let fixture: ComponentFixture<AddNewFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddNewFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
