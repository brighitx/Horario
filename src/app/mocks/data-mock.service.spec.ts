import { TestBed } from '@angular/core/testing';

import { DataMockService } from './data-mock.service';

describe('DataMockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataMockService = TestBed.get(DataMockService);
    expect(service).toBeTruthy();
  });
});
