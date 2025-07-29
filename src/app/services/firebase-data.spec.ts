import { TestBed } from '@angular/core/testing';

import { FirebaseData } from './firebase-data';

describe('FirebaseData', () => {
  let service: FirebaseData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
