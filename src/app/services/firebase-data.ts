import { Injectable } from '@angular/core';
import { Database, ref, set, push, get, child } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDataService {
  constructor(private db: Database) {}

  writeData(path: string, data: any) {
    const newRef = push(ref(this.db, path));
    return set(newRef, data);
  }

  readData(path: string) {
    const dbRef = ref(this.db);
    return get(child(dbRef, path));
  }
}