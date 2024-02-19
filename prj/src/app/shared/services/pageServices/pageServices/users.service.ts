import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { user } from 'src/app/shared/models/userModel';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private firestore: AngularFirestore) {}
  // Method to add a user to Firestore
  addUser(newUser: user): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.collection('users').doc(id).set(newUser);
  }
  // Method to get all users from Firestore
  getUsers(): Observable<user[]> {
    return this.firestore.collection<user>('users').valueChanges();
  }
}
