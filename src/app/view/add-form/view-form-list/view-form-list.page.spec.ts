import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewFormListPage } from './view-form-list.page';

describe('ViewFormListPage', () => {
  let component: ViewFormListPage;
  let fixture: ComponentFixture<ViewFormListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFormListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewFormListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
