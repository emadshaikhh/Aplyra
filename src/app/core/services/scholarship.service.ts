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
          // Search term filter
          if (filters.searchTerm) {
            const searchLower = filters.searchTerm.toLowerCase();
            const matchesSearch = 
              scholarship.name.toLowerCase().includes(searchLower) ||
              scholarship.description.toLowerCase().includes(searchLower) ||
              scholarship.provider.toLowerCase().includes(searchLower);
            
            if (!matchesSearch) return false;
          }

          // Course filter
          if (filters.course && scholarship.course !== filters.course) {
            return false;
          }

          // State filter
          if (filters.state && filters.state !== 'All India') {
            if (scholarship.state !== filters.state && scholarship.state !== 'All India') {
              return false;
            }
          }

          // Category filter
          if (filters.category && scholarship.category !== filters.category) {
            return false;
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