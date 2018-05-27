import { TestBed, inject } from '@angular/core/testing';

import { MobiletopupService } from './mobiletopup.service';

describe('MobiletopupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MobiletopupService]
    });
  });

  it('should be created', inject([MobiletopupService], (service: MobiletopupService) => {
    expect(service).toBeTruthy();
  }));
});
