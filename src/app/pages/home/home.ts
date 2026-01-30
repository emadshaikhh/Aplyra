import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import the 4 sub-components
import { HeroComponent } from './components/hero/hero';
import { CategoriesComponent } from './components/categories/categories';
import { TrustComponent } from './components/trust/trust';
import { CtaComponent } from './components/cta/cta';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    HeroComponent, 
    CategoriesComponent, 
    TrustComponent, 
    CtaComponent
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent {
  // No logic needed here anymore! 
  // Everything is handled by the child components.
}