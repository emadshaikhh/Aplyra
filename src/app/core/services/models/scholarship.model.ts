export type ScholarshipCategory = 'scholarship' | 'internship' | 'scheme' | string;

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  category: ScholarshipCategory;
  amount: string;
  deadline: string;
  
  // Details
  course: string;
  state: string;
  incomeLimit: string;
  
  // Content
  description: string;
  eligibility: string[];
  documents: string[];
  
  // External
  officialLink: string;
  
  // Optional
  tags?: string[];
  providerLogo?: string;
}

export interface ScholarshipFilters {
  searchTerm: string;
  course: string[]; 
  state: string[];  
  category?: string;
}