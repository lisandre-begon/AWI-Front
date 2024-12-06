import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAchComponent } from './list-ach.component';

describe('ListAchComponent', () => {
  let component: ListAchComponent;
  let fixture: ComponentFixture<ListAchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
