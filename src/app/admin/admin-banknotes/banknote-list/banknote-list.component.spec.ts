import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BanknoteListComponent } from './banknote-list.component';

describe('BanknoteListComponent', () => {
  let component: BanknoteListComponent;
  let fixture: ComponentFixture<BanknoteListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BanknoteListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BanknoteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
