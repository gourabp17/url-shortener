import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor(private httpClient: HttpClient) { }
  public getAllShortUrl() {
    return this.httpClient.get(`http://localhost:3000/url`);
  }
}
