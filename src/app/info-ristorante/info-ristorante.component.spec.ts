import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoRistoranteComponent } from './info-ristorante.component';

describe('InfoRistoranteComponent', () => {
  let component: InfoRistoranteComponent;
  let fixture: ComponentFixture<InfoRistoranteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoRistoranteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoRistoranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
