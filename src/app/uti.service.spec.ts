import { TestBed } from '@angular/core/testing';

import { UtiService } from './uti.service';

describe('UtiService', () => {
  let service: UtiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
