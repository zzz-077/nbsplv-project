import { TestBed } from '@angular/core/testing';

import { LocalstoragesService } from './localstorages.service';

describe('LocalstoragesService', () => {
  let service: LocalstoragesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalstoragesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
