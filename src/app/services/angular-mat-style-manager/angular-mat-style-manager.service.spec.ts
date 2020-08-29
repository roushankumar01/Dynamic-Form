import { TestBed } from '@angular/core/testing';

import { AngularMatStyleManagerService } from './angular-mat-style-manager.service';

describe('AngularMatStyleManagerService', () => {
  let service: AngularMatStyleManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularMatStyleManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
