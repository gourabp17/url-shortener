import { Component, OnInit } from '@angular/core';
import { HistoryService } from './history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  displayedColumns: string[] = ['accessTime', 'ip', 'userAgent'];
  dataSource;

  constructor(private historyService: HistoryService) { }

  ngOnInit() {
  }
  getHistory(shortUrlId){
    this.historyService.getHistory(shortUrlId).subscribe((data: any) => {
      console.log(data);
      this.dataSource = data;
    });
  }
}

export interface UrlElement {
  ip: string;
  userAgent: string;
  accessTime: string;
}
