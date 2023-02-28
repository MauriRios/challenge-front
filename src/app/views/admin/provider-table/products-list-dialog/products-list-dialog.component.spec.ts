import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsListDialogComponent } from './products-list-dialog.component';

describe('ProductsListDialogComponent', () => {
  let component: ProductsListDialogComponent;
  let fixture: ComponentFixture<ProductsListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsListDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
