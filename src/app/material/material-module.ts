// src/app/material/material.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// 🌟 Button, Inputs, Form Fields
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

// 📅 Date Picker Modules
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

// 🧱 Dialog & Modal
import { MatDialogModule } from '@angular/material/dialog';

// 📋 Lists & Layouts
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

// ⏳ Progress Spinner for Loading
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [],
  imports: [
    CommonModule // Required for structural directives like ngIf, ngFor
  ],
  exports: [
    // 👉 Form Controls
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,

    // 👉 Date handling
    MatDatepickerModule,
    MatNativeDateModule,

    // 👉 Modal dialogs
    MatDialogModule,

    // 👉 Layout and UI
    MatListModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatCheckboxModule,

    // 👉 Feedback UI
    MatProgressSpinnerModule
  ]
})
export class MaterialModule { }