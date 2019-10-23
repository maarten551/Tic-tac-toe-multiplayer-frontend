import {TestBed} from '@angular/core/testing';

import {LobbyOverviewWebSocketService} from './lobby-overview-web-socket.service';

describe('LobbyOverviewWebSocketServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LobbyOverviewWebSocketService = TestBed.get(LobbyOverviewWebSocketService);
    expect(service).toBeTruthy();
  });
});
