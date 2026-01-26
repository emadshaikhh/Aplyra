import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarshipDetail } from './scholarship-detail';

describe('ScholarshipDetail', () => {
  let component: ScholarshipDetail;
  let fixture: ComponentFixture<ScholarshipDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScholarshipDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScholarshipDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
