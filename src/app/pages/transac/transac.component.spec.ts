import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransacComponent } from './transac.component';

describe('TransacComponent', () => {
  let component: TransacComponent;
  let fixture: ComponentFixture<TransacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransacComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
