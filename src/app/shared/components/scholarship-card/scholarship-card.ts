import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Scholarship } from '../../../core/services/models/scholarship.model';

@Component({
  selector: 'app-scholarship-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './scholarship-card.html',
  styleUrls: ['./scholarship-card.scss']
})
export class ScholarshipCardComponent {
  @Input() scholarship!: Scholarship;
  @Input() viewMode: 'grid' | 'list' = 'grid';
  
  // NEW INPUT: Default to true (show badge usually)
  @Input() showCategory: boolean = true;

  // --- Helper Function (Must be INSIDE the class) ---
  isUrgent(): boolean {
    if (!this.scholarship?.deadline) return false;
    const deadline = new Date(this.scholarship.deadline);
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 15; // Mark urgent if less than 15 days
  }
} 