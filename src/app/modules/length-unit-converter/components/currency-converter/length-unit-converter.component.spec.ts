import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LengthUnitConverterComponent } from './length-unit-converter.component';

describe('CurrencyConverterComponent', () => {
  let component: LengthUnitConverterComponent;
  let fixture: ComponentFixture<LengthUnitConverterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LengthUnitConverterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LengthUnitConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
