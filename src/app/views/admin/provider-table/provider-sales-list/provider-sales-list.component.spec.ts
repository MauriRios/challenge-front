import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderSalesListComponent } from './provider-sales-list.component';

describe('ProviderSalesListComponent', () => {
  let component: ProviderSalesListComponent;
  let fixture: ComponentFixture<ProviderSalesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderSalesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderSalesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
