import { TestBed } from '@angular/core/testing';

import { VendeursService } from './vendeur-service.service';

describe('VendeurServiceService', () => {
  let service: VendeursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendeursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
