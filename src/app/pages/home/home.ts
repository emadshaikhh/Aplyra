import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SearchBarComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent {
  features = [
    {
      icon: '🎯',
      title: 'Smart Filters',
      description: 'Find opportunities that match your profile with intelligent filtering'
    },
    {
      icon: '✓',
      title: 'Verified Sources',
      description: 'All opportunities verified from official government and institutional sources'
    },
    {
      icon: '📅',
      title: 'Deadline Tracking',
      description: 'Never miss an opportunity with organized deadline information'
    }
  ];

  categories = [
    {
      name: 'Scholarships',
      icon: '🎓',
      description: 'Financial aid for education',
      route: '/scholarships',
      query: { category: 'scholarship' }
    },
    {
      name: 'Internships',
      icon: '💼',
      description: 'Gain practical experience',
      route: '/scholarships',
      query: { category: 'internship' }
    },
    {
      name: 'Government Schemes',
      icon: '🏛️',
      description: 'Welfare programs & benefits',
      route: '/scholarships',
      query: { category: 'scheme' }
    }
  ];

  constructor(private router: Router) {}

  onSearch(searchTerm: string) {
    this.router.navigate(['/scholarships'], {
      queryParams: { search: searchTerm }
    });
  }

  navigateToCategory(category: any) {
    this.router.navigate([category.route], {
      queryParams: category.query
    });
  }
}