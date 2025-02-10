import { TestBed } from '@angular/core/testing';

import { PlanesHistoryServiceService } from './planes-history-service.service';

describe('PlanesHistoryServiceService', () => {
  let service: PlanesHistoryServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanesHistoryServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
