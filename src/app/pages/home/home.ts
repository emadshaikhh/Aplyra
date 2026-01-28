import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Import Router
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent {

  // --- 1. CATEGORY DATA (With 'path' for routing) ---
  categories = [
    { 
      name: 'Scholarships', 
      icon: '🎓', 
      description: 'Financial aid for tuition, books, and living costs based on merit or need.',
      path: '/scholarships' // Matches your app.routes.ts
    },
    { 
      name: 'Government Schemes', 
      icon: '🏛️', 
      description: 'Official state and central government initiatives for student welfare.',
      path: '/schemes'      // Matches your app.routes.ts
    },
    { 
      name: 'Internships', 
      icon: '💼', 
      description: 'Gain real-world experience with top companies and startups.',
      path: '/internships'  // Matches your app.routes.ts
    },
    { 
      name: 'Competitions', 
      icon: '🏆', 
      description: 'Hackathons, quizzes, and coding challenges to showcase your skills.',
      path: '/scholarships' // Fallback to list (or make a new page later)
    }
  ];

  // --- 2. TRUST/FEATURE DATA ---
  features = [
    { title: 'Smart Filters', description: 'Stop searching blindly. Our algorithm matches opportunities strictly to your profile.' },
    { title: 'Verified Sources', description: 'We manually verify every listing. No dead links, no fake scams.' },
    { title: 'Deadline Tracking', description: 'Never miss a date. We highlight deadlines in red so you prioritize what ends soon.' }
  ];

  constructor(private router: Router) {} // Inject Router

  // --- 3. NAVIGATION LOGIC ---
  navigateToCategory(category: any) {
    this.router.navigate([category.path]);
  }

  onSearch(term: string) {
    if (term) {
      this.router.navigate(['/scholarships'], { queryParams: { search: term } });
    }
  }
}