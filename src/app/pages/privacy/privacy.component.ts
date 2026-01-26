import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-privacy',
  standalone: true,
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss',
  imports: [CommonModule]
})
export class PrivacyComponent {
  lastUpdated = 'January 2026';
}
