import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DettaglioPiattoComponent } from './dettaglio-piatto.component';

describe('DettaglioPiattoComponent', () => {
  let component: DettaglioPiattoComponent;
  let fixture: ComponentFixture<DettaglioPiattoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DettaglioPiattoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DettaglioPiattoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
