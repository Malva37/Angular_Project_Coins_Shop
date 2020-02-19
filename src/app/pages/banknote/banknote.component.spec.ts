import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BanknoteComponent } from './banknote.component';

describe('BanknoteComponent', () => {
  let component: BanknoteComponent;
  let fixture: ComponentFixture<BanknoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BanknoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BanknoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
