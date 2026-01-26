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
}
