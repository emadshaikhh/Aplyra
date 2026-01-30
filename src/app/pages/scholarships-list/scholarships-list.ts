import { Component, OnInit, HostListener } from '@angular/core';
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
  
  // --- STATE ---
  showMobileFilters = false;
  isLoading = true;
  pageTitle: string = 'Explore Opportunities'; 
  
  // NEW: Pagination State
  allScholarships: Scholarship[] = [];      // Stores the FULL list from API
  displayedScholarships: Scholarship[] = []; // Stores only the 12 visible items
  currentPage: number = 1;
  itemsPerPage: number = 12;
  totalPages: number = 0;
  pageNumbers: number[] = [];

  pageType: 'scholarships' | 'internships' | 'schemes' = 'scholarships';
  searchPlaceholder = 'Search by name, provider, or keyword...';

  filters: ScholarshipFilters = {
    searchTerm: '',
    course: [], 
    state: [],  
    category: ''
  };

  // Filter Options (Same as before)
  scholarshipClassOptions = ['Class 10', 'Class 12', 'Undergraduate', 'Postgraduate', 'Diploma'];
  internshipRoles = ['Web Development', 'App Development', 'Data Science', 'Marketing', 'Content Writing'];
  internshipDuration = ['1 Month', '3 Months', '6 Months', 'Remote', 'On-site'];
  schemeIncomeGroups = ['< 2.5 Lakh', '2.5 - 5 Lakh', '> 5 Lakh', 'EWS'];
  schemeCategories = ['General', 'OBC', 'SC/ST', 'Minority', 'Women'];
  stateOptions = ['All India', 'Uttar Pradesh', 'Maharashtra', 'Delhi', 'Bihar'];

  constructor(
    private service: ScholarshipService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const url = this.router.url;
    
    if (url.includes('internships')) {
      this.pageType = 'internships';
      this.pageTitle = 'Find Internships';
    } else if (url.includes('schemes')) {
      this.pageType = 'schemes';
      this.pageTitle = 'Government Schemes';
    } else {
      this.pageType = 'scholarships';
      this.pageTitle = 'Explore Scholarships';
    }

    this.checkScreenSize();

    this.route.data.subscribe(data => {
      if (data['category']) {
        this.filters.category = data['category'];
        if (data['title']) this.pageTitle = data['title'];
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

  @HostListener('window:resize') 
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    if (window.innerWidth < 768) {
      this.searchPlaceholder = 'Search opportunities...';
    } else {
      if (this.pageType === 'internships') {
         this.searchPlaceholder = 'Search by role, company, or skill...';
      } else if (this.pageType === 'schemes') {
         this.searchPlaceholder = 'Search schemes by state or department...';
      } else {
         this.searchPlaceholder = 'Search by name, provider, or keyword...';
      }
    }
  }

  toggleFilters() {
    this.showMobileFilters = !this.showMobileFilters;
    document.body.style.overflow = this.showMobileFilters ? 'hidden' : 'auto';
  }

  closeFilters() {
    this.showMobileFilters = false;
    document.body.style.overflow = 'auto';
  }

  load() {
    this.isLoading = true;
    
    this.service.searchScholarships(this.filters, this.pageType).subscribe({
      next: (res) => {
        // NEW: Store full result separately
        this.allScholarships = res;
        
        // NEW: Calculate Pagination
        this.currentPage = 1; // Reset to page 1 on new search
        this.totalPages = Math.ceil(this.allScholarships.length / this.itemsPerPage);
        this.pageNumbers = Array(this.totalPages).fill(0).map((x, i) => i + 1);
        
        // NEW: Slice the first page
        this.updatePaginatedList();
        
        this.isLoading = false;
        console.log('Data loaded:', res.length, 'items'); 
      },
      error: (err) => {
        console.error('Error loading data:', err);
        this.isLoading = false;
        this.allScholarships = [];
        this.displayedScholarships = [];
      }
    });
  }

  // NEW: Helper to slice the array
  updatePaginatedList() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedScholarships = this.allScholarships.slice(startIndex, endIndex);
    
    // Smooth scroll to top of list
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // NEW: Button Action
  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePaginatedList();
  }

  onSearch(term: string) {
    this.filters.searchTerm = term;
    this.load();
  }

  updateFilter(type: 'course' | 'state', value: string) {
    const list = this.filters[type]; 
    if (list.includes(value)) {
      this.filters[type] = list.filter(item => item !== value);
    } else {
      this.filters[type].push(value);
    }
    
    if (!this.showMobileFilters) {
      this.load(); 
    }
  }

  applyFilters() {
    this.load();
    this.closeFilters();
  }

  resetFilters() {
    this.filters.course = [];
    this.filters.state = [];
    this.filters.searchTerm = '';
    if (this.pageType === 'schemes') this.filters.category = '';
    this.load();
    if (window.innerWidth < 768) this.closeFilters(); 
  }
}