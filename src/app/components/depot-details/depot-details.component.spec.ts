import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepotDetailsComponent } from './depot-details.component';

describe('DepotDetailsComponent', () => {
  let component: DepotDetailsComponent;
  let fixture: ComponentFixture<DepotDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepotDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepotDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
