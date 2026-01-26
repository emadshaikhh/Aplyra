import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Scholarship } from './models/scholarship.model';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataPath = 'assets/data/scholarships.json';

  constructor(private http: HttpClient) {}

  getScholarships(): Observable<Scholarship[]> {
    return this.http.get<Scholarship[]>(this.dataPath);
  }
}