import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunicationBasicComponent } from './comunication-basic.component';

describe('ComunicationBasicComponent', () => {
  let component: ComunicationBasicComponent;
  let fixture: ComponentFixture<ComunicationBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComunicationBasicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComunicationBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
