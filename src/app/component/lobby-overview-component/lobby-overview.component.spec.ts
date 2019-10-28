import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LobbyOverviewComponent} from './lobby-overview.component';

describe('LobbyOverviewComponentComponent', () => {
  let component: LobbyOverviewComponent;
  let fixture: ComponentFixture<LobbyOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LobbyOverviewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LobbyOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
