import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpClient: HttpClient) { }
  public checkHealth() {
    return this.httpClient.get(`http://localhost:3000/health`);
  }
  public getShortUrl(url: string) {
    return this.httpClient.post(`http://localhost:3000/url`, { originalUrl: url });
  }
}
