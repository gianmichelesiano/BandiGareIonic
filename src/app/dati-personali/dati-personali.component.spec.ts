import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatiPersonaliComponent } from './dati-personali.component';

describe('DatiPersonaliComponent', () => {
  let component: DatiPersonaliComponent;
  let fixture: ComponentFixture<DatiPersonaliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatiPersonaliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatiPersonaliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
