import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { ListComponent } from './pages/scholarships-list/scholarships-list';
import { ScholarshipDetailComponent } from './pages/scholarship-detail/scholarship-detail';
import { AboutComponent } from './pages/about/about';
import { PrivacyComponent } from './pages/privacy/privacy.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Aplyra - Find Scholarships, Internships & Government Schemes'
  },
  
  // --- 1. SCHOLARSHIPS PAGE ---
  {
    path: 'scholarships',
    component: ListComponent,
    title: 'Scholarships - Aplyra',
    data: { category: 'scholarship', title: 'Find Scholarships' } // <--- Added Data
  },
  
  // --- 2. INTERNSHIPS PAGE ---
  {
    path: 'internships',
    component: ListComponent, // Reusing the component
    title: 'Internships - Aplyra',
    data: { category: 'internship', title: 'Find Internships' }
  },

  // --- 3. SCHEMES PAGE ---
  {
    path: 'schemes',
    component: ListComponent, // Reusing the component
    title: 'Government Schemes - Aplyra',
    data: { category: 'scheme', title: 'Government Schemes' }
  },

  {
    path: 'scholarship/:id', // Note: You might want to rename this to 'opportunity/:id' later for consistency
    component: ScholarshipDetailComponent,
    title: 'Details - Aplyra'
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'About Us - Aplyra'
  },
  {
    path: 'privacy',
    component: PrivacyComponent,
    title: 'Privacy Policy - Aplyra'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];