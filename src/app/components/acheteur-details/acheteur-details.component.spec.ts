import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcheteurDetailsComponent } from './acheteur-details.component';

describe('AcheteurDetailsComponent', () => {
  let component: AcheteurDetailsComponent;
  let fixture: ComponentFixture<AcheteurDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcheteurDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcheteurDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
