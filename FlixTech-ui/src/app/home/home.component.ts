import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  shortenedUrl = null;
  constructor(private appService: HomeService, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
  }

  processUrl(url: string) {
    console.log('Url is: ' + url);
    if (!url) {
      alert('Invalid url');
      return;
    }
    this.appService.getShortUrl(url).subscribe((data: any) => {
      console.log(data);
      this.shortenedUrl = data.responseUrl;
    });
  }
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
