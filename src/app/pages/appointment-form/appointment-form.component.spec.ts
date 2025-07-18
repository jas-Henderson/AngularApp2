import { ComponentFixture, TestBed } from '@angular/core/testing'; // Import necessary testing utilities from Angular core
import { AppointmentFormComponent } from './appointment-form.component'; // Import the component to be tested

describe('AppointmentFormComponent', () => { // Describe the test suite for AppointmentFormComponent
  let component: AppointmentFormComponent;
  let fixture: ComponentFixture<AppointmentFormComponent>;

  beforeEach(async () => { // Configure the testing module before each test
    await TestBed.configureTestingModule({
      declarations: [ AppointmentFormComponent ]
    })
    .compileComponents(); // Compile the component and its template
  });

  beforeEach(() => { // Create the component instance and fixture before each test
    fixture = TestBed.createComponent(AppointmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { // Test to check if the component is created successfully
    expect(component).toBeTruthy();
  });
});
