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
  filteredScholarships: Scholarship[] = [];
  isLoading = true;
  pageTitle: string = 'Explore Opportunities'; 
  
  // 1. PAGE TYPE VARIABLE
  pageType: 'scholarships' | 'internships' | 'schemes' = 'scholarships';

  // Dynamic Placeholder Text
  searchPlaceholder = 'Search by name, provider, or keyword...';

  filters: ScholarshipFilters = {
    searchTerm: '',
    course: [], 
    state: [],  
    category: ''
  };

  // 2. DEFINE SPECIFIC FILTER OPTIONS
  // For Scholarships
  scholarshipClassOptions = ['Class 10', 'Class 12', 'Undergraduate', 'Postgraduate', 'Diploma'];
  
  // For Internships
  internshipRoles = ['Web Development', 'App Development', 'Data Science', 'Marketing', 'Content Writing'];
  internshipDuration = ['1 Month', '3 Months', '6 Months', 'Remote', 'On-site'];

  // For Govt Schemes
  schemeIncomeGroups = ['< 2.5 Lakh', '2.5 - 5 Lakh', '> 5 Lakh', 'EWS'];
  schemeCategories = ['General', 'OBC', 'SC/ST', 'Minority', 'Women'];

  // Common
  stateOptions = ['All India', 'Uttar Pradesh', 'Maharashtra', 'Delhi', 'Bihar'];

  constructor(
    private service: ScholarshipService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // 3. DETECT PAGE TYPE FROM URL
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

    this.checkScreenSize(); // Set initial placeholder based on type & size

    // Handle Route Data (e.g., coming from Category Cards)
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

  // --- LISTEN FOR RESIZE ---
  @HostListener('window:resize') 
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    // If width < 768px, use short generic text
    if (window.innerWidth < 768) {
      this.searchPlaceholder = 'Search opportunities...';
    } else {
      // Desktop: Use specific text based on Page Type
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
    // Prevent background scrolling when menu is open
    if (this.showMobileFilters) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  closeFilters() {
    this.showMobileFilters = false;
    document.body.style.overflow = 'auto';
  }

  load() {
    this.isLoading = true;
    
    // Pass 'this.pageType' to the service
    this.service.searchScholarships(this.filters, this.pageType).subscribe({
      next: (res) => {
        this.filteredScholarships = res;
        this.isLoading = false;
        console.log('Data loaded successfully:', res); // Debug log
      },
      error: (err) => {
        console.error('Error loading data:', err); // check your console for this!
        this.isLoading = false;
        // Optional: Set empty list to avoid breaking UI
        this.filteredScholarships = [];
      }
    });
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
    
    // Only load immediately if we are on Desktop (drawer is closed)
    if (!this.showMobileFilters) {
      this.load(); 
    }
  }

  applyFilters() {
    this.load();          // Fetch the data now
    this.closeFilters();  // Close the drawer
  }

  resetFilters() {
    this.filters.course = [];
    this.filters.state = [];
    this.filters.searchTerm = '';
    
    // Reset category if not schemes
    if (this.pageType === 'schemes') this.filters.category = '';

    this.load();
    // Optional: Close drawer on reset if on mobile
    if (window.innerWidth < 768) this.closeFilters(); 
  }
}