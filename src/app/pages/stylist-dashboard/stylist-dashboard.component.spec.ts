import { ComponentFixture, TestBed } from '@angular/core/testing'; // Import necessary testing utilities from Angular core
import { StylistDashboardComponent } from './stylist-dashboard.component'; // Import the component to be tested

describe('StylistDashboardComponent', () => { // Describe the test suite for StylistDashboardComponent
  let component: StylistDashboardComponent;
  let fixture: ComponentFixture<StylistDashboardComponent>;

  beforeEach(async () => { // Configure the testing module before each test
    await TestBed.configureTestingModule({
      declarations: [ StylistDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => { // Create the component instance and fixture before each test
    fixture = TestBed.createComponent(StylistDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { // Test to check if the component is created successfully
    expect(component).toBeTruthy();
  });
});
