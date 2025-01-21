import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutetesttwoComponent } from './routetesttwo.component';

describe('RoutetesttwoComponent', () => {
  let component: RoutetesttwoComponent;
  let fixture: ComponentFixture<RoutetesttwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutetesttwoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoutetesttwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
