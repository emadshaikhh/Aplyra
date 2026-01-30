import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent {
  isMenuOpen = false;
  
  // 1. New State for Category
  searchCategory: string = 'scholarships'; 
  searchTerm: string = '';

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isMenuOpen = false;
      
      // Auto-reset input when going back to home
      if (event.url === '/' || !event.url.includes('?search=')) {
        this.searchTerm = '';
      }
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  // 2. Updated Search Logic
  onHeaderSearch() {
    if (!this.searchTerm.trim()) return;

    // Navigate to the selected category page
    const targetPage = `/${this.searchCategory}`;

    this.router.navigate([targetPage], { 
      queryParams: { search: this.searchTerm } 
    });

    this.closeMenu();
  }
}