import { TestBed } from '@angular/core/testing';

import { PlayerOverviewWebSocketService } from './player-overview-web-socket.service';

describe('PlayerOverviewWebSocketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlayerOverviewWebSocketService = TestBed.get(PlayerOverviewWebSocketService);
    expect(service).toBeTruthy();
  });
});
