import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleByDateComponent } from './sale-by-date.component';

describe('SaleByDateComponent', () => {
  let component: SaleByDateComponent;
  let fixture: ComponentFixture<SaleByDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleByDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleByDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
