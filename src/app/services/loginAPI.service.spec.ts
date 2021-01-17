/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoginAPIService } from './loginAPI.service';

describe('Service: LoginAPI', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginAPIService]
    });
  });

  it('should ...', inject([LoginAPIService], (service: LoginAPIService) => {
    expect(service).toBeTruthy();
  }));
});
