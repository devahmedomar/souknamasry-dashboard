import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopShopOwnersComponent } from './top-shop-owners.component';

describe('TopShopOwnersComponent', () => {
  let component: TopShopOwnersComponent;
  let fixture: ComponentFixture<TopShopOwnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopShopOwnersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopShopOwnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
