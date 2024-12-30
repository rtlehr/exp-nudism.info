import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayContactInfoComponent } from './display-contact-info.component';

describe('DisplayContactInfoComponent', () => {
  let component: DisplayContactInfoComponent;
  let fixture: ComponentFixture<DisplayContactInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayContactInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplayContactInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
