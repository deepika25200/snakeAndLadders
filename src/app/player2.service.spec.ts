import { TestBed } from '@angular/core/testing';

import { Player2Service } from './player2.service';

describe('Player2Service', () => {
  let service: Player2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Player2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
