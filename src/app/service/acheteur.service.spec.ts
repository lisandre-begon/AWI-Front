import { TestBed } from '@angular/core/testing';

import { AcheteurService } from './acheteur.service';

describe('AcheteurService', () => {
  let service: AcheteurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcheteurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
