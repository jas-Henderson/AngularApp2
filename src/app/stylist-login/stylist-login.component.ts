import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { MaterialModule } from '../material/material-module';
import { MatDialog, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-stylist-login',
  templateUrl: './stylist-login.component.html',
  styleUrls: ['./stylist-login.component.css'],
  imports: [FormsModule, RouterModule, CommonModule, MaterialModule],
})
export class StylistLoginComponent {
  username = '';
  password = '';
  isLoading = false;

  constructor(
    private auth: Auth,
    private router: Router,
    private dialog: MatDialog
  ) {}

  async login() {
    this.isLoading = true;

    try {
      const result = await signInWithEmailAndPassword(this.auth, this.username, this.password);
      console.log('Login successful:', result.user.email);

      // ✅ Store stylistEmail in localStorage
      localStorage.setItem('stylistEmail', result.user.email || '');

      // Navigate to Admin Dashboard
      this.router.navigate(['/admin']);
    } catch (error: any) {
      console.error('Login failed:', error.message);
      this.dialog.open(ErrorDialog, {
        data: { message: error.message }
      });
    } finally {
      this.isLoading = false;
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}

// Error Dialog Component
@Component({
  standalone: true,
  selector: 'error-dialog',
  template: `
    <h2 mat-dialog-title>Login Failed</h2>
    <mat-dialog-content>{{ data.message }}</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>OK</button>
    </mat-dialog-actions>
  `,
  imports: [CommonModule, MatDialogModule, MatButtonModule]
})
export class ErrorDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}
}