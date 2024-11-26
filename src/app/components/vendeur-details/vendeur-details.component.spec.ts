import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendeurDetailsComponent } from './vendeur-details.component';

describe('VendeurDetailsComponent', () => {
  let component: VendeurDetailsComponent;
  let fixture: ComponentFixture<VendeurDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendeurDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendeurDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
