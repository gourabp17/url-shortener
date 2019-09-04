import { Component, OnInit } from '@angular/core';
import { UrlService } from './url.service';

@Component({
  selector: 'app-url',
  templateUrl: './url.component.html',
  styleUrls: ['./url.component.css']
})
export class UrlComponent implements OnInit {

  displayedColumns: string[] = ['noOfTimesCalled', 'createdOn', 'shortUrl', 'actualUrl'];
  dataSource;

  constructor(private urlService: UrlService) { }

  ngOnInit() {
    this.urlService.getAllShortUrl().subscribe((data: any) => {
      console.log(Object.values(data));
      this.dataSource = Object.values(data);
    });
  }

}

export interface UrlElement {
  actualUrl: string;
  shortUrl: number;
  createdOn: string;
  noOfTimesCalled: number;
}
