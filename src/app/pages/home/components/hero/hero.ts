import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-hero',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hero.html',
  styleUrls: ['./hero.scss']
})
export class HeroComponent {

  // 🔹 Dropdown state
  categoryOpen: boolean = false;

  // 🔹 Search state
  searchCategory: string = 'scholarships';
  searchTerm: string = '';

  constructor(private router: Router) {}

  // 🔹 Toggle dropdown (called from select-wrapper click)
  toggleCategory(): void {
    this.categoryOpen = !this.categoryOpen;
  }

  // 🔹 Select dropdown option
  selectCategory(value: string): void {
    this.searchCategory = value;
    this.categoryOpen = false;
  }

  // 🔹 Map value → label (used in HTML)
  getCategoryLabel(value: string): string {
    switch (value) {
      case 'scholarships':
        return 'Scholarships';
      case 'internships':
        return 'Internships';
      case 'schemes':
        return 'Govt Schemes';
      default:
        return 'Select';
    }
  }

  // 🔹 Close dropdown when clicking anywhere outside
  @HostListener('document:click')
  closeDropdown(): void {
    this.categoryOpen = false;
  }

  // 🔹 Search action
  onSearch(): void {
    const routePath = `/${this.searchCategory}`;

    this.router.navigate([routePath], {
      queryParams: this.searchTerm
        ? { search: this.searchTerm }
        : {}
    });
  }
}
