import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from './data.service';
import { Scholarship, ScholarshipFilters } from './models/scholarship.model';

@Injectable({
  providedIn: 'root'
})
export class ScholarshipService {
  constructor(private dataService: DataService) {}

  getAllScholarships(): Observable<Scholarship[]> {
    return this.dataService.getScholarships();
  }

  getScholarshipById(id: string): Observable<Scholarship | undefined> {
    return this.dataService.getScholarships().pipe(
      map(scholarships => scholarships.find(s => s.id === id))
    );
  }

  searchScholarships(filters: ScholarshipFilters): Observable<Scholarship[]> {
    return this.dataService.getScholarships().pipe(
      map(scholarships => {
        return scholarships.filter(scholarship => {
          
          // 1. Search Term (Name, Provider, or Description)
          if (filters.searchTerm) {
            const searchLower = filters.searchTerm.toLowerCase();
            const matchesSearch = 
              scholarship.name.toLowerCase().includes(searchLower) ||
              scholarship.description.toLowerCase().includes(searchLower) ||
              scholarship.provider.toLowerCase().includes(searchLower);
            
            if (!matchesSearch) return false;
          }

          // 2. Category Filter (Single Select)
          if (filters.category && scholarship.category !== filters.category) {
            return false;
          }

          // 3. Course Filter (MULTI-SELECT)
          // If user selected courses, only show if scholarship's course is in that list
          if (filters.course && filters.course.length > 0) {
            if (!filters.course.includes(scholarship.course)) {
              return false;
            }
          }

          // 4. State Filter (MULTI-SELECT with 'All India' logic)
          // Show if state matches one of the selected states OR is 'All India'
          if (filters.state && filters.state.length > 0) {
            const isMatch = filters.state.includes(scholarship.state) || scholarship.state === 'All India';
            if (!isMatch) return false;
          }

          return true;
        });
      })
    );
  }

  getUpcomingDeadlines(limit: number = 5): Observable<Scholarship[]> {
    return this.dataService.getScholarships().pipe(
      map(scholarships => {
        const today = new Date();
        return scholarships
          .filter(s => new Date(s.deadline) >= today)
          .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
          .slice(0, limit);
      })
    );
  }

  getScholarshipsByCategory(category: string): Observable<Scholarship[]> {
    return this.dataService.getScholarships().pipe(
      map(scholarships => scholarships.filter(s => s.category === category))
    );
  }
}