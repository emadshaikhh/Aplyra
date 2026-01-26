import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ScholarshipService } from '../../core/services/scholarship.service';
import { Scholarship, ScholarshipFilters } from '../../core/services/models/scholarship.model';

import { ScholarshipCardComponent } from '../../shared/components/scholarship-card/scholarship-card';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar';

@Component({
  selector: 'app-scholarships-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ScholarshipCardComponent, SearchBarComponent],
  templateUrl: './scholarships-list.html',
  styleUrls: ['./scholarships-list.scss']
})
export class ListComponent implements OnInit {
  filteredScholarships: Scholarship[] = [];
  isLoading = true;
  viewMode: 'grid' | 'list' = 'grid';

  filters: ScholarshipFilters = {
    searchTerm: '',
    course: '',
    state: '',
    category: ''
  };

  courseOptions = ['Undergraduate', 'Postgraduate'];
  stateOptions = ['All India', 'Jammu and Kashmir'];
  categoryOptions = [
    { value: '', label: 'All' },
    { value: 'scholarship', label: 'Scholarships' },
    { value: 'internship', label: 'Internships' },
    { value: 'scheme', label: 'Schemes' }
  ];

  constructor(
    private service: ScholarshipService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.filters.searchTerm = params['search'] || '';
      this.filters.category = params['category'] || '';
      this.load();
    });
  }

  load() {
    this.isLoading = true;
    this.service.searchScholarships(this.filters).subscribe(res => {
      this.filteredScholarships = res;
      this.isLoading = false;
    });
  }

  onSearch(term: string) {
    this.filters.searchTerm = term;
    this.load();
  }

  onFilterChange() {
    this.load();
  }

  toggleViewMode() {
    this.viewMode = this.viewMode === 'grid' ? 'list' : 'grid';
  }
}
