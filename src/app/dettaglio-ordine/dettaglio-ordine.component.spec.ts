import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DettaglioOrdineComponent } from './dettaglio-ordine.component';

describe('DettaglioOrdineComponent', () => {
  let component: DettaglioOrdineComponent;
  let fixture: ComponentFixture<DettaglioOrdineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DettaglioOrdineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DettaglioOrdineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
