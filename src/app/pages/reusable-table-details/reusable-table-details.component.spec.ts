import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableTableDetailsComponent } from './reusable-table-details.component';

describe('ReusableTableDetailsComponent', () => {
  let component: ReusableTableDetailsComponent;
  let fixture: ComponentFixture<ReusableTableDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReusableTableDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReusableTableDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
