import { TestBed } from '@angular/core/testing';

import { FirebaseEngineService } from './firebase-engine.service';

describe('FirebaseEngineService', () => {
  let service: FirebaseEngineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseEngineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
