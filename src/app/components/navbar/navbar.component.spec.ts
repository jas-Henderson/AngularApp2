import { ComponentFixture, TestBed } from '@angular/core/testing'; // Import necessary testing utilities from Angular core
import { NavbarComponent } from './navbar.component'; // Import the component to be tested

describe('NavbarComponent', () => { // Describe the test suite for NavbarComponent
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => { // Configure the testing module before each test
    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => { // Create the component instance and fixture before each test
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { // Test to check if the component is created successfully
    expect(component).toBeTruthy();
  });
});
