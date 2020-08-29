import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddOrEditFieldsPage } from './add-or-edit-fields.page';

describe('AddOrEditFieldsPage', () => {
  let component: AddOrEditFieldsPage;
  let fixture: ComponentFixture<AddOrEditFieldsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrEditFieldsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddOrEditFieldsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
