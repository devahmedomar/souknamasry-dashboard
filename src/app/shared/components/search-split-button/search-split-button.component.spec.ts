import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSplitButtonComponent } from './search-split-button.component';

describe('SearchSplitButtonComponent', () => {
  let component: SearchSplitButtonComponent;
  let fixture: ComponentFixture<SearchSplitButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchSplitButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchSplitButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
