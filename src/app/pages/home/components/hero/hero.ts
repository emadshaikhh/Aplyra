import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-hero',
  standalone: true,
  imports: [CommonModule, FormsModule], // Ensure FormsModule is here
  templateUrl: './hero.html',
  styleUrls: ['./hero.scss']
})
export class HeroComponent {
  
  // State for the new search bar
  searchCategory: string = 'scholarships';
  searchTerm: string = '';

  constructor(private router: Router) {}

  onSearch() {
    // Navigate to the correct page based on the dropdown selection
    const routePath = `/${this.searchCategory}`;
    
    this.router.navigate([routePath], { 
      queryParams: this.searchTerm ? { search: this.searchTerm } : {} 
    });
  }
}