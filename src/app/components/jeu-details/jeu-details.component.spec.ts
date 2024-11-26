import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JeuDetailsComponent } from './jeu-details.component';

describe('JeuDetailsComponent', () => {
  let component: JeuDetailsComponent;
  let fixture: ComponentFixture<JeuDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JeuDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JeuDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
