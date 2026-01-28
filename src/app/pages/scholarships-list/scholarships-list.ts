import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ScholarshipService } from '../../core/services/scholarship.service';
import { Scholarship, ScholarshipFilters } from '../../core/services/models/scholarship.model';
import { ScholarshipCardComponent } from '../../shared/components/scholarship-card/scholarship-card';

@Component({
  selector: 'app-scholarships-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ScholarshipCardComponent],
  templateUrl: './scholarships-list.html',
  styleUrls: ['./scholarships-list.scss']
})
export class ListComponent implements OnInit {
  
  // --- STATE VARIABLES ---
  filteredScholarships: Scholarship[] = [];
  isLoading = true;
  pageTitle: string = 'Explore Opportunities'; 

  // --- FILTERS STATE (Now using Arrays for Multi-Select) ---
  filters: ScholarshipFilters = {
    searchTerm: '',
    course: [], // <--- Changed to empty Array
    state: [],  // <--- Changed to empty Array
    category: ''
  };

  // --- FILTER OPTIONS ---
  courseOptions = ['Class 10', 'Class 12', 'Undergraduate', 'Postgraduate', 'Diploma'];
  stateOptions = ['All India', 'Uttar Pradesh', 'Maharashtra', 'Delhi', 'Bihar'];

  constructor(
    private service: ScholarshipService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      if (data['category']) {
        this.filters.category = data['category'];
        this.pageTitle = data['title'];
      }
    });

    this.route.queryParams.subscribe(params => {
      if (params['search']) this.filters.searchTerm = params['search'];
      if (!this.filters.category && params['category']) {
         this.filters.category = params['category'];
      }
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

  // --- MULTI-SELECT FILTER LOGIC ---
  updateFilter(type: 'course' | 'state', value: string) {
    const list = this.filters[type]; // Get the current array (e.g. ['Class 10'])

    if (list.includes(value)) {
      // IF EXISTS: Remove it (Uncheck)
      this.filters[type] = list.filter(item => item !== value);
    } else {
      // IF NOT EXISTS: Add it (Check)
      this.filters[type].push(value);
    }
    
    this.load(); // Reload data immediately
  }

  resetFilters() {
    // Reset to empty arrays
    this.filters.course = [];
    this.filters.state = [];
    this.filters.searchTerm = '';
    this.load();
  }
}