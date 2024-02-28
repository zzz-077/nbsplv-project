import { TestBed } from '@angular/core/testing';

import { ArtistDataService } from './artist-data.service';

describe('ArtistDataService', () => {
  let service: ArtistDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtistDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
