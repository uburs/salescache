import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarOffersComponent } from './sidebar-offers.component';

describe('SidebarOffersComponent', () => {
  let component: SidebarOffersComponent;
  let fixture: ComponentFixture<SidebarOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarOffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
