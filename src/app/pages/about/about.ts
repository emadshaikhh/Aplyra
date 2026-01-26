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
  features = [
    {
      icon: '🎯',
      title: 'Comprehensive Database',
      description: 'Access to thousands of verified scholarships, internships, and government schemes from across India.'
    },
    {
      icon: '🔍',
      title: 'Smart Search & Filters',
      description: 'Find opportunities that match your profile with our intelligent filtering system.'
    },
    {
      icon: '✓',
      title: 'Verified Information',
      description: 'All opportunities are verified from official sources including government portals and educational institutions.'
    },
    {
      icon: '📅',
      title: 'Deadline Tracking',
      description: 'Never miss an opportunity with clear deadline information and timely reminders.'
    },
    {
      icon: '🔒',
      title: 'Privacy First',
      description: 'We don\'t store your personal data. You apply directly on official provider websites.'
    },
    {
      icon: '📱',
      title: 'Mobile Friendly',
      description: 'Access Aplixo on any device - desktop, tablet, or mobile for searching on the go.'
    }
  ];

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