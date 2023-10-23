import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import * as firebase from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  //acheive Authorization
  constructor(private db: AngularFireDatabase) {}
  save(user: firebase.UserInfo) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email,
    });
  }
}
