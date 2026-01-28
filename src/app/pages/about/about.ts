import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.html',
  styleUrls: ['./about.scss']
})
export class AboutComponent {
  
  // NOTE: The 'features' array was removed because we now use 
  // professional static SVGs directly in the about.html file.

  // We keep 'values' because it is text-only and still uses *ngFor
  values = [
    {
      title: 'Transparency',
      description: 'Clear information about every opportunity with direct links to official sources.'
    },
    {
      title: 'Accessibility',
      description: 'Making opportunities discoverable for students from all backgrounds.'
    },
    {
      title: 'Trust',
      description: 'Building trust through verified information and secure practices.'
    }
  ];
}