import { TestBed } from '@angular/core/testing'; // Import necessary testing utilities from Angular core
import { AppointmentService } from './appointment.service'; // Import the service to be tested

describe('AppointmentService', () => { // Describe the test suite for AppointmentService
  let service: AppointmentService;

  beforeEach(() => { // Configure the testing module before each test
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentService);
  });

  it('should be created', () => { // Test to check if the service is created successfully
    expect(service).toBeTruthy();
  });
});
