import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePortsSubportsComponent } from './service-ports-subports.component';

describe('ServicePortsSubportsComponent', () => {
  let component: ServicePortsSubportsComponent;
  let fixture: ComponentFixture<ServicePortsSubportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicePortsSubportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicePortsSubportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
