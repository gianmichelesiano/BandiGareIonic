import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecensioniRistoranteComponent } from './recensioni-ristorante.component';

describe('RecensioniRistoranteComponent', () => {
  let component: RecensioniRistoranteComponent;
  let fixture: ComponentFixture<RecensioniRistoranteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecensioniRistoranteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecensioniRistoranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
