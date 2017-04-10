import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DettaglioRistoranteComponent } from './dettaglio-ristorante.component';

describe('DettaglioRistoranteComponent', () => {
  let component: DettaglioRistoranteComponent;
  let fixture: ComponentFixture<DettaglioRistoranteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DettaglioRistoranteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DettaglioRistoranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
