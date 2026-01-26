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
}

export interface ScholarshipFilters {
  course?: string;
  state?: string;
  incomeLimit?: string;
  category?: string;
  searchTerm?: string;
}