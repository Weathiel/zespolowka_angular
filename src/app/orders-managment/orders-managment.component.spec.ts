import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersManagmentComponent } from './orders-managment.component';

describe('OrdersManagmentComponent', () => {
  let component: OrdersManagmentComponent;
  let fixture: ComponentFixture<OrdersManagmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersManagmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
