import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { user } from 'src/app/shared/models/userModel';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private firestore: AngularFirestore) {}

  addUser(newUser: user): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.collection('users').doc(id).set(newUser);
  }

  getUsers(): Observable<user[]> {
    return this.firestore.collection<user>('users').valueChanges();
  }
  userExist(email: string, password: string): Observable<boolean> {
    return this.firestore
      .collection<user>('users')
      .valueChanges()
      .pipe(
        map((users) =>
          users.some(
            (user) => user.email === email && user.password === password
          )
        )
      );
  }
}
