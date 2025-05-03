import { TestBed } from '@angular/core/testing';

import { FirebaseShareTextApiService } from './firebase-share-text-api.service';

describe('FirebaseShareTextApiService', () => {
  let service: FirebaseShareTextApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseShareTextApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
