import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { forwardtoregisterGuard } from './forwardtoregister.guard';

describe('forwardtoregisterGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => forwardtoregisterGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
