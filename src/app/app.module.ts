import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {InjectableRxStompConfig, RxStompService, rxStompServiceFactory} from '@stomp/ng2-stompjs';
import {myRxStompConfig} from './my-rx-stomp.config';
import {LobbyOverviewComponent} from './component/lobby-overview-component/lobby-overview.component';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GameSessionComponent} from './component/game-session/game-session.component';
import {MaterialModule} from './modules/material.module';
import {AppConfigService} from './service/app-config.service';
import {HttpClientModule} from '@angular/common/http';

const appInitializerFn = (appConfig: AppConfigService) => {
  return () => {
    return appConfig.loadAppConfig().toPromise();
  };
};

const webSocketInitializerFn = (appConfig: AppConfigService) => {
  const myRxStompConfigValue = myRxStompConfig;
  myRxStompConfigValue.brokerURL = appConfig.appConfig.baseWebsocketUrl;

  return myRxStompConfigValue;
};

@NgModule({
  declarations: [
    AppComponent,
    LobbyOverviewComponent,
    GameSessionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [AppConfigService]
    }, {
      provide: InjectableRxStompConfig,
      useFactory: webSocketInitializerFn,
      deps: [AppConfigService],
      // useValue: myRxStompConfig
    }, {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
