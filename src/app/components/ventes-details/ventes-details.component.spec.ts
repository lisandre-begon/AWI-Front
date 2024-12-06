import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentesDetailsComponent } from './ventes-details.component';

describe('VentesDetailsComponent', () => {
  let component: VentesDetailsComponent;
  let fixture: ComponentFixture<VentesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentesDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
