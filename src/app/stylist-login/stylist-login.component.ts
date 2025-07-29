
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  standalone: true,
  selector: 'app-stylist-login',
  templateUrl: './stylist-login.component.html',
  styleUrls: ['./stylist-login.component.css'],
  imports: [FormsModule, RouterModule, CommonModule]
})
export class StylistLoginComponent {
  username = '';
  password = '';

  constructor(private auth: Auth, private router: Router) {}

  async login() {
    try {
      const result = await signInWithEmailAndPassword(this.auth, this.username, this.password);
      console.log('Login successful:', result.user.email);

      // Navigate to the admin dashboard
      this.router.navigate(['/admin']);
    } catch (error: any) {
      console.error('Login failed:', error.message);
      alert('Login failed: ' + error.message);
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}