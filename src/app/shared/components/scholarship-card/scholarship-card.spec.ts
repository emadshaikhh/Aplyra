import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'; // Needed for routerLink
import { ScholarshipCardComponent } from './scholarship-card'; // Update path if needed
import { Scholarship } from '../../../core/services/models/scholarship.model';

describe('ScholarshipCardComponent', () => {
  let component: ScholarshipCardComponent;
  let fixture: ComponentFixture<ScholarshipCardComponent>;

  // Dummy data for the test
  const mockScholarship: Scholarship = {
    id: '1',
    name: 'Test Scholarship',
    provider: 'Test Provider',
    category: 'scholarship',
    amount: '₹10,000',
    deadline: '2025-12-31',
    course: 'UG',
    state: 'Delhi',
    incomeLimit: '<2L',
    description: 'Test Desc',
    eligibility: ['Criteria 1'],
    documents: ['Doc 1'],
    officialLink: 'http://test.com'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ScholarshipCardComponent, // Standalone component
        RouterTestingModule       // Needed because the card has [routerLink]
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScholarshipCardComponent);
    component = fixture.componentInstance;
    
    // CRITICAL: Pass the required input data
    component.scholarship = mockScholarship; 
    
    fixture.detectChanges(); // Now safe to render
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the scholarship name', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.title')?.textContent).toContain('Test Scholarship');
  });
});