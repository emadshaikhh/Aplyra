import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Scholarship, ScholarshipFilters } from './models/scholarship.model';

@Injectable({
  providedIn: 'root'
})
export class ScholarshipService {

  constructor(private http: HttpClient) {}

  // 1. SEARCH FUNCTION (List Page)
  searchScholarships(filters: ScholarshipFilters, type: 'scholarships' | 'internships' | 'schemes'): Observable<Scholarship[]> {
    
    let jsonFile = 'assets/data/scholarships.json';
    if (type === 'internships') {
      jsonFile = 'assets/data/internships.json';
    } else if (type === 'schemes') {
      jsonFile = 'assets/data/schemes.json';
    }

    return this.http.get<Scholarship[]>(jsonFile).pipe(
      map(data => {
        return data.filter(item => {
          const matchesSearch = !filters.searchTerm || 
            item.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
            item.provider.toLowerCase().includes(filters.searchTerm.toLowerCase());

          // Check if filters.course is defined and not empty
          const matchesCourse = !filters.course || filters.course.length === 0 || 
            filters.course.some(c => item.course.includes(c));

          // Check if filters.state is defined and not empty
          const matchesState = !filters.state || filters.state.length === 0 || 
            filters.state.includes(item.state);
            
          return matchesSearch && matchesCourse && matchesState;
        });
      })
    );
  }

  // 2. GET BY ID FUNCTION (Detail Page)
  getScholarshipById(id: string, type: 'scholarships' | 'internships' | 'schemes'): Observable<Scholarship | undefined> {
    
    let jsonFile = 'assets/data/scholarships.json';
    if (type === 'internships') {
      jsonFile = 'assets/data/internships.json';
    } else if (type === 'schemes') {
      jsonFile = 'assets/data/schemes.json';
    }

    return this.http.get<Scholarship[]>(jsonFile).pipe(
      map(items => items.find(item => item.id === id))
    );
  }
}