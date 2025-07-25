import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FirebaseDataService {
  constructor(private db: AngularFireDatabase) {}

  // Save data as an Observable (compatible with subscribe)
  saveData(path: string, data: any): Observable<void> {
    return new Observable<void>((observer) => {
      this.db.object(path).set(data)
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
  }

  // Fetch data
  fetchData<T>(path: string): Observable<T | null> {
    return this.db.object<T>(path).valueChanges();
  }
}