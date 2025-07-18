import { TestBed } from '@angular/core/testing'; // Import necessary testing utilities from Angular core
import { StylistService } from './stylist.service'; // Import the service to be tested

describe('StylistService', () => { // Describe the test suite for StylistService
  let service: StylistService;

  beforeEach(() => { // Configure the testing module before each test
    TestBed.configureTestingModule({});
    service = TestBed.inject(StylistService);
  });

  it('should be created', () => { // Test to check if the service is created successfully
    expect(service).toBeTruthy();
  });
});
