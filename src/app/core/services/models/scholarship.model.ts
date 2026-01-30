export type ScholarshipCategory = 'scholarship' | 'internship' | 'scheme' | string;

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  category: 'scholarship' | 'internship' | 'scheme';
  deadline: string;
  amount: string;
  course: string;
  state: string;
  incomeLimit: string;
  description: string;
  eligibility: string[];
  documents: string[];
  officialLink: string;
  // Add this new optional field:
  providerImage?: string; 
}

export interface ScholarshipFilters {
  searchTerm: string;
  course: string[]; 
  state: string[];  
  category?: string;
}