import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  constructor(private http:HttpClient,private sanitizer: DomSanitizer){
  }

  videoUrl="http://localhost:8000/movie/trailer";
  ngOnInit(){
  //   const headers = new HttpHeaders({
  //     Range: `bytes=0-500`,
  //   });

  //   return this.http.get('http://localhost:8000/movie/trailer', {
  //     headers,
  //     responseType: 'blob',
  //   }).subscribe((blob: Blob) => {
  //     const videoBlob = new Blob([blob], { type: 'video/mp4' });
  //     this.videoUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(videoBlob));
  //   });;
  }
}
