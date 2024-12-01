import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private modalSubject = new BehaviorSubject<boolean>(false); // False means modal is closed, true means open
  modalState$ = this.modalSubject.asObservable();

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<any>('assets/tripData.json');
  }

  getbanners(): Observable<any> {
    return this.http.get<any>('assets/banners.json');
}

openModal(): void {
  this.modalSubject.next(true); // Open the modal
}

closeModal(): void {
  this.modalSubject.next(false); // Close the modal
}
}
