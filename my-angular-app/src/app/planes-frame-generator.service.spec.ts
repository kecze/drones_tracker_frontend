import { TestBed } from '@angular/core/testing';

import { PlanesFrameGeneratorService } from './planes-frame-generator.service';

describe('PlanesFrameGeneratorService', () => {
  let service: PlanesFrameGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanesFrameGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
