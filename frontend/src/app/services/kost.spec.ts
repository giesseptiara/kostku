import { TestBed } from '@angular/core/testing';

import { Kost } from './kost';

describe('Kost', () => {
  let service: Kost;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Kost);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
