import { ComponentFixture, TestBed } from '@angular/core/testing'; // Import necessary testing utilities from Angular core
import { CalendarComponent } from './calendar.component'; // Import the component to be tested

describe('CalendarComponent', () => { // Describe the test suite for CalendarComponent
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async () => { // Configure the testing module before each test
    await TestBed.configureTestingModule({
      declarations: [ CalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => { // Create the component instance and fixture before each test
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { // Test to check if the component is created successfully
    expect(component).toBeTruthy();
  });
});
