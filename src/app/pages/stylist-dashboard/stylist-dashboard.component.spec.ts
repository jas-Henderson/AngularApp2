import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StylistDashboardComponent } from './stylist-dashboard.component';

describe('StylistDashboardComponent', () => {
  let component: StylistDashboardComponent;
  let fixture: ComponentFixture<StylistDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StylistDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StylistDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
