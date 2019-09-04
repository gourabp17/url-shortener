import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private httpClient: HttpClient) { }
  public getHistory(shortUrl: any) {
    return this.httpClient.post(`http://localhost:3000/history/` + shortUrl, null);
  }
}
