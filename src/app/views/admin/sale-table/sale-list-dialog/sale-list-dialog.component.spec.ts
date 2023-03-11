import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleListDialogComponent } from './sale-list-dialog.component';

describe('SaleListDialogComponent', () => {
  let component: SaleListDialogComponent;
  let fixture: ComponentFixture<SaleListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleListDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
