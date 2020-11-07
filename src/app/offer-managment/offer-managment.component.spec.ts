import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferManagmentComponent } from './offer-managment.component';

describe('OfferManagmentComponent', () => {
  let component: OfferManagmentComponent;
  let fixture: ComponentFixture<OfferManagmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferManagmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
