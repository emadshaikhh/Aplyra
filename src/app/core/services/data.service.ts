import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Scholarship } from './models/scholarship.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // --- THE MOCK DATA ---
  private scholarships: Scholarship[] = [
    {
      id: '1',
      name: 'HDFC Badhte Kadam Scholarship',
      provider: 'HDFC Bank',
      category: 'scholarship',
      amount: '₹30,000',
      deadline: '2025-12-15',
      course: 'Undergraduate',
      state: 'All India',
      incomeLimit: 'Less than 6L',
      description: 'A merit-cum-means scholarship for meritorious students from economically weaker sections.',
      eligibility: ['Must have passed Class 12', 'Family income < 6L'],
      documents: ['Aadhar Card', 'Income Certificate', 'Mark sheets'],
      officialLink: 'https://www.hdfcbank.com'
    },
    {
      id: '2',
      name: 'Reliance Foundation Scholarship',
      provider: 'Reliance Foundation',
      category: 'scholarship',
      amount: '₹2,00,000',
      deadline: '2026-01-20',
      course: 'Postgraduate',
      state: 'All India',
      incomeLimit: 'No Limit',
      description: 'Supporting India’s brightest students in the fields of AI and Computer Science.',
      eligibility: ['First year PG student', 'Score > 75% in UG'],
      documents: ['College ID', 'Previous Marksheets'],
      officialLink: 'https://www.reliancefoundation.org'
    },
    {
      id: '3',
      name: 'UP Government Internship Scheme',
      provider: 'UP Govt',
      category: 'internship',
      amount: '₹2,500/month',
      deadline: '2025-11-30',
      course: 'Undergraduate',
      state: 'Uttar Pradesh',
      incomeLimit: 'No Limit',
      description: 'Technical internship opportunities in various government departments.',
      eligibility: ['Resident of UP', 'Engineering or Polytechnic student'],
      documents: ['Domicile Certificate', 'NOC from College'],
      officialLink: 'https://up.gov.in'
    },
    {
      id: '4',
      name: 'PM YASASVI Scheme',
      provider: 'Central Govt',
      category: 'scheme',
      amount: '₹75,000',
      deadline: '2025-10-10',
      course: 'Class 9-12',
      state: 'All India',
      incomeLimit: 'Less than 2.5L',
      description: 'Financial assistance for OBC, EBC and DNT students studying in top class schools.',
      eligibility: ['OBC/EBC/DNT Category', 'Studying in Class 9 or 11'],
      documents: ['Caste Certificate', 'Income Certificate'],
      officialLink: 'https://yet.nta.ac.in'
    }
  ];

  constructor() { }

  // Simply return the data (with a fake delay to mimic a real API)
  getScholarships(): Observable<Scholarship[]> {
    return of(this.scholarships).pipe(delay(300));
  }
}