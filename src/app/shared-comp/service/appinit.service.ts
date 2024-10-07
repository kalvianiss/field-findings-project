import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

interface Config {
  api_server: string;
}

@Injectable({
  providedIn: 'root',
})
export class AppInitService {
  private baseUrl: string = environment.api_cloud;

  constructor(private readonly http: HttpClient) {
    this.load();
  }

  load(): Promise<void> {
    return this.http
      .get<Config>('assets/config/config.json')
      .toPromise()
      .then((config) => {
        this.baseUrl = config.api_server;
      });
  }
}

export function initConfig(config: AppInitService): () => Promise<void> {
  return () => config.load();
}
