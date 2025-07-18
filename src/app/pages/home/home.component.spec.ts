import { ComponentFixture, TestBed } from '@angular/core/testing'; // Import necessary testing utilities from Angular core
import { HomeComponent } from './home.component'; // Import the component to be tested

describe('HomeComponent', () => { // Describe the test suite for HomeComponent
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => { // Configure the testing module before each test
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => { // Create the component instance and fixture before each test
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { // Test to check if the component is created successfully
    expect(component).toBeTruthy();
  });
});
