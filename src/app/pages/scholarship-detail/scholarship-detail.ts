import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ScholarshipService } from '../../core/services/scholarship.service';
import { Scholarship } from '../../core/services/models/scholarship.model';

@Component({
  selector: 'app-scholarship-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './scholarship-detail.html',
  styleUrls: ['./scholarship-detail.scss']
})
export class ScholarshipDetailComponent implements OnInit {
  scholarship: Scholarship | null = null;
  isLoading = true;
  notFound = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private scholarshipService: ScholarshipService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.loadScholarship(id);
    });
  }

  loadScholarship(id: string) {
    this.isLoading = true;
    this.scholarshipService.getScholarshipById(id).subscribe({
      next: (data) => {
        if (data) {
          this.scholarship = data;
          this.isLoading = false;
        } else {
          this.notFound = true;
          this.isLoading = false;
        }
      },
      error: (error) => {
        console.error('Error loading scholarship:', error);
        this.notFound = true;
        this.isLoading = false;
      }
    });
  }

  getCategoryLabel(category: string): string {
    const labels: { [key: string]: string } = {
      'scholarship': 'Scholarship',
      'internship': 'Internship',
      'scheme': 'Government Scheme'
    };
    return labels[category] || category;
  }

  getCategoryColor(category: string): string {
    const colors: { [key: string]: string } = {
      'scholarship': '#3b82f6',
      'internship': '#10b981',
      'scheme': '#f59e0b'
    };
    return colors[category] || '#6b7280';
  }

  formatDeadline(deadline: string): string {
    const date = new Date(deadline);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  }

  isDeadlinePassed(): boolean {
    if (!this.scholarship) return false;
    const deadline = new Date(this.scholarship.deadline);
    const today = new Date();
    return deadline < today;
  }

  getDaysUntilDeadline(): number {
    if (!this.scholarship) return 0;
    const deadline = new Date(this.scholarship.deadline);
    const today = new Date();
    const diff = deadline.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  goBack() {
    this.router.navigate(['/scholarships']);
  }

  applyNow() {
    if (this.scholarship) {
      window.open(this.scholarship.officialLink, '_blank', 'noopener,noreferrer');
    }
  }
}