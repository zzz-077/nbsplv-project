import { EventEmitter, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from, map } from 'rxjs';
import { user } from 'src/app/shared/models/userModel';
import { LocalstoragesService } from '../../localstorages/localstorages.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  // userSignedIn = new EventEmitter<{ user: user; documentId: string }>();

  constructor(
    private localStg: LocalstoragesService,
    private firestore: AngularFirestore,
    private firestorage: AngularFireStorage,
    private fireAuth: AngularFireAuth
  ) {}

  addUser(newUser: user): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.collection('users').doc(id).set(newUser);
  }

  addUserByGoogle(newUser: user, userID: string): Observable<void> {
    const id = userID;
    if (newUser.name?.split(' ')) {
      newUser.name = newUser.name?.split(' ')[0];
    } else if (newUser.name?.split('-')) {
      newUser.name = newUser.name?.split('-')[0];
    } else if (newUser.name?.split('_')) {
      newUser.name = newUser.name?.split('_')[0];
    } else if (newUser.name?.split('/')) {
      newUser.name = newUser.name?.split('/')[0];
    } else if (newUser.name?.split('.')) {
      newUser.name = newUser.name?.split('.')[0];
    } else {
      newUser.name = newUser.name;
    }
    return from(this.firestore.collection('users').doc(id).set(newUser));
  }

  getUsers(): Observable<user[]> {
    return this.firestore.collection<user>('users').valueChanges();
  }

  ifUserExistsByEmail(email: string): Observable<any | null> {
    return this.firestore
      .collection('users', (ref) => ref.where('email', '==', email))
      .get()
      .pipe(
        map((user) => {
          if (user.size > 0) {
            const userDoc = user.docs[0];
            const userData = userDoc.data() as user;
            return { user: userData, id: userDoc.id };
          } else {
            return null;
          }
        })
      );
  }

  async findUserByEmailAndPassword(
    email: string,
    password: string
  ): Promise<boolean> {
    this.fireAuth;
    try {
      await this.fireAuth.signInWithEmailAndPassword(email, password);
      return true;
    } catch (error) {
      console.log('ERROR WHILE LOGIN: ', error);
      return false;
    }
  }

  findEnteredUserData(email: string, password: string): Observable<any> {
    return this.firestore
      .collection('users', (ref) =>
        ref.where('email', '==', email).where('password', '==', password)
      )
      .get()
      .pipe(
        map((querySnapshot) => {
          if (querySnapshot.size === 0) {
            return null;
          } else {
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data() as user;
            // this.userSignedIn.emit({ user: userData, documentId: userDoc.id });
            return { user: userData, id: userDoc.id };
          }
        })
      );
  }

  async updateUserImg(userId: string, userImgUrl: string): Promise<void> {
    try {
      await this.firestore.collection('users').doc(userId).update({
        img: userImgUrl,
      });
    } catch (error) {
      console.log('ERROR WHILE UPDATING USER IMG: ', error);
    }
  }

  deleteUserImgFromStorage(img: string): Promise<void> {
    return this.firestorage.ref(`userImgBase/${img}`).delete().toPromise();
  }

  getImageNameFromUrl(url: string): string {
    const parts = url.split('/');
    const imageNameWithToken = parts[parts.length - 1];
    const imageWithQuestionMark = imageNameWithToken.split('?');
    const changedname = imageWithQuestionMark[0];
    return changedname.slice(14);
  }

  async updateUser(
    userId: string,
    name: string,
    password: string
  ): Promise<void> {
    try {
      await this.firestore.collection('users').doc(userId).update({
        name: name,
        password: password,
      });
    } catch (error) {
      console.log('ERROR WHILE UPDATING USER NAME&PASSWORD: ', error);
    }
  }
}
