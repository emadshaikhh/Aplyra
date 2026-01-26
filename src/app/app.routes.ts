import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { ListComponent } from './pages/scholarships-list/scholarships-list';
import { ScholarshipDetailComponent } from './pages/scholarship-detail/scholarship-detail';
import { AboutComponent } from './pages/about/about';
import { PrivacyComponent } from './pages/privacy/privacy';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Aplixo - Find Scholarships, Internships & Government Schemes'
  },
  {
    path: 'scholarships',
    component: ListComponent,
    title: 'Scholarships - Aplixo'
  },
  {
    path: 'scholarships/:id',
    component: ScholarshipDetailComponent,
    title: 'Scholarship Details - Aplixo'
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'About Us - Aplixo'
  },
  {
    path: 'privacy',
    component: PrivacyComponent,
    title: 'Privacy Policy - Aplixo'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];