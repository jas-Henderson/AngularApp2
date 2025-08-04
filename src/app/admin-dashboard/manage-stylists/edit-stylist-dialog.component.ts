// src/app/admin-dashboard/manage-stylists/edit-stylist-dialog.component.ts

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-stylist-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './edit-stylist-dialog.component.html',
  styleUrls: ['./edit-stylist-dialog.component.scss']
})
export class EditStylistDialogComponent {
  name: string;
  email: string;

  constructor(
    public dialogRef: MatDialogRef<EditStylistDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string; email: string }
  ) {
    this.name = data.name;
    this.email = data.email;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close({ name: this.name, email: this.email });
  }
}