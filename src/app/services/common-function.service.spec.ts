import { TestBed } from '@angular/core/testing';

import { CommonFunctionService } from './common-function.service';

describe('CommonFunctionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommonFunctionService = TestBed.get(CommonFunctionService);
    expect(service).toBeTruthy();
  });
});
