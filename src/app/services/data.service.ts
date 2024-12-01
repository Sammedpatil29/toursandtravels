import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<any>('assets/tripData.json');
  }

  getbanners(): Observable<any> {
    return this.http.get<any>('assets/banners.json');
}
}
