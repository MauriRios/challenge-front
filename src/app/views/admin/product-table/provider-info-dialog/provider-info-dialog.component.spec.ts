import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderInfoDialogComponent } from './provider-info-dialog.component';

describe('ProviderInfoDialogComponent', () => {
  let component: ProviderInfoDialogComponent;
  let fixture: ComponentFixture<ProviderInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderInfoDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
