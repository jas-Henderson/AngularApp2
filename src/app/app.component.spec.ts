import { TestBed } from '@angular/core/testing'; // Import necessary testing utilities from Angular core
import { RouterTestingModule } from '@angular/router/testing';    // Import RouterTestingModule for testing routing
import { AppComponent } from './app.component'; // Import the main application component

describe('AppComponent', () => { // Describe the test suite for AppComponent
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents(); // Compile the component and its template
  });

  it('should create the app', () => { // Test to check if the app component is created successfully
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'AngularApp2'`, () => { // Test to check if the title property is set correctly
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('AngularApp2');
  });

  it('should render title', () => { // Test to check if the title is rendered in the template
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('AngularApp2 app is running!');
  });
});
