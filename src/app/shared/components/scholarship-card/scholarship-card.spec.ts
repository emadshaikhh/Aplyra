import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarshipCard } from './scholarship-card';

describe('ScholarshipCard', () => {
  let component: ScholarshipCard;
  let fixture: ComponentFixture<ScholarshipCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScholarshipCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScholarshipCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
