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
  {
    path: 'scholarships',
    component: ListComponent,
    title: 'Scholarships - Aplyra'
  },
  {
    path: 'scholarships/:id',
    component: ScholarshipDetailComponent,
    title: 'Scholarship Details - Aplyra  '
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'About Us - Aplyra'
  },
  {
    path: 'privacy',
    component: PrivacyComponent,
    title: 'Privacy Policy - Aplyra '
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];