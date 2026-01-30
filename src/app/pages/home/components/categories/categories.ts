import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.html',
  styleUrls: ['./categories.scss']
})
export class CategoriesComponent {

  categories = [
    {
      name: 'Scholarships',
      icon: 'graduation',
      description: 'Financial aid for tuition, books, and living costs based on merit or need.',
      path: '/scholarships'
    },
    {
      name: 'Government Schemes',
      icon: 'government',
      description: 'Official state and central government initiatives for student welfare.',
      path: '/schemes'
    },
    {
      name: 'Internships',
      icon: 'briefcase',
      description: 'Gain real-world experience with top companies and startups.',
      path: '/internships'
    },
    {
      name: 'Competitions',
      icon: 'trophy',
      description: 'Hackathons, quizzes, and coding challenges to showcase your skills.',
      path: '/scholarships'
    }
  ];

  constructor(private router: Router) {}

  navigateToCategory(category: any) {
    this.router.navigate([category.path]);
  }
}
