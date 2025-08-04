// src/app/admin-dashboard/manage-stylists/stylist-management.component.ts

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material-module';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FirebaseApp } from '@angular/fire/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set, get, child } from 'firebase/database';
import { EditStylistDialogComponent } from './edit-stylist-dialog.component';

@Component({
  selector: 'app-stylist-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './stylist-management.component.html',
  styleUrls: ['./stylist-management.component.scss']
})
export class StylistManagementComponent implements OnInit {
  @Input() stylists: any[] = [];
  @Output() refresh = new EventEmitter<void>();

  newStylist = {
    name: '',
    phone: '',
    email: '',
    password: '',
    services: []
  };

  allServices: string[] = ['Haircut', 'Coloring', 'Styling', 'Extensions', 'Highlights'];
  currentStylists: any[] = [];

  stylistRegistrationSuccess: boolean = false;
  stylistRegistrationError: string = '';

  private auth = getAuth();
  private db = getDatabase();

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadStylists();
  }

  registerStylist() {
    const { email, password, name, phone, services } = this.newStylist;

    this.stylistRegistrationSuccess = false;
    this.stylistRegistrationError = '';

    createUserWithEmailAndPassword(this.auth, email, password)
      .then(userCredential => {
        const uid = userCredential.user.uid;
        const stylistRef = ref(this.db, `stylists/${uid}`);

        return set(stylistRef, {
          name,
          email,
          phone,
          services
        });
      })
      .then(() => {
        this.stylistRegistrationSuccess = true;
        this.resetForm();
        this.loadStylists();
        this.refresh.emit();
      })
      .catch(error => {
        console.error(error);
        this.stylistRegistrationError = error.message;
      });
  }

  loadStylists() {
    const dbRef = ref(this.db);
    get(child(dbRef, 'stylists'))
      .then(snapshot => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          this.currentStylists = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }));
        } else {
          this.currentStylists = [];
        }
      })
      .catch(error => {
        console.error('Error loading stylists:', error);
      });
  }

  openEditDialog(stylist: any) {
    const dialogRef = this.dialog.open(EditStylistDialogComponent, {
      data: {
        name: stylist.name,
        email: stylist.email
      },
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Updated stylist:', result);
        // Optional: Update Firebase here if you want live updates.
      }
    });
  }

  resetForm() {
    this.newStylist = {
      name: '',
      phone: '',
      email: '',
      password: '',
      services: []
    };
  }
}