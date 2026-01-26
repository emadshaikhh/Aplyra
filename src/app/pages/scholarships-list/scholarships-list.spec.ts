import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarshipsList } from './scholarships-list';

describe('ScholarshipsList', () => {
  let component: ScholarshipsList;
  let fixture: ComponentFixture<ScholarshipsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScholarshipsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScholarshipsList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
