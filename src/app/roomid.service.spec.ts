import { TestBed } from '@angular/core/testing';

import { RoomidService } from './roomid.service';

describe('RoomidService', () => {
  let service: RoomidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
