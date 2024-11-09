import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcheteurComponent } from './acheteur.component';

describe('AcheteurComponent', () => {
  let component: AcheteurComponent;
  let fixture: ComponentFixture<AcheteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcheteurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcheteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
