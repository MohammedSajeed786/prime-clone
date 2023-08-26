import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Response } from 'src/app/shared/interfaces/Response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  profileUrl = environment.apiUrl + 'profile';
  constructor(private http: HttpClient) {}

  getProfile(): Observable<Response> {
    return this.http.get<Response>(this.profileUrl);
  }

  updateProfilePicture(profilePicture: File) :Observable<Response> {
    let formData = new FormData();
    formData.set('file', profilePicture);
    return this.http.put<Response>(this.profileUrl + '/update/profilePicture', formData);
  }

  updateFullName(name:string)  :Observable<Response> {
    
    return this.http.put<Response>(this.profileUrl + "/update/fullName?fullName="+ name,{});
  }
}
