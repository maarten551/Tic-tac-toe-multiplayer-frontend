import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Config} from '../model/Config';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private _appConfig: Config;

  constructor(private http: HttpClient) {
  }

  public loadAppConfig(): Observable<Config> {
    return this.http.get<Config>('/assets/data/appConfig.json')
      .pipe(
        tap(data => {
          this._appConfig = data;
        })
      );
  }

  public get appConfig(): Config {
    return this._appConfig;
  }
}
