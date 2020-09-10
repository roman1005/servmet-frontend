import { TestBed } from '@angular/core/testing';

import { PssServiceService } from './pss-service.service';

describe('PortfoliosServiceService', () => {
  let service: PssServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PssServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
