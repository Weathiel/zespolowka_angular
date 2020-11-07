import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsManagmentComponent } from './cars-managment.component';

describe('CarsManagmentComponent', () => {
  let component: CarsManagmentComponent;
  let fixture: ComponentFixture<CarsManagmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsManagmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
