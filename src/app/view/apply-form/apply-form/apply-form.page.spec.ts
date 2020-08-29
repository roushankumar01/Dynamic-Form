import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ApplyFormPage } from './apply-form.page';

describe('ApplyFormPage', () => {
  let component: ApplyFormPage;
  let fixture: ComponentFixture<ApplyFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ApplyFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
