import { Injectable } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, getAuth, signInWithRedirect } from 'firebase/auth';
import { Observable } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment.prod';
import * as firebase from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<firebase.UserInfo | null>;
  constructor(private afAuth: AngularFireAuth) {
    this.user$ = afAuth.authState;
  }
  async login() {
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(
      getAuth(initializeApp(enviroment.firebase)),
      provider
    ).catch((error) => {
      console.log(error.code);
      alert(error.message);
    });
  }
  async logout() {
    return this.afAuth
      .signOut()
      .then(() => {
        console.log('Logout Sucessfully');
      })
      .catch(() => {
        console.log('Logout Failed');
      });
  }
}
// signInWithEmailAndPassword(
//   getAuth(initializeApp(enviroment.firebase)),
//   'abodaraaali50@gmail.com',
//   'MasterR540'
// ).then((data) => {
//   console.log('succes Sign-In');
//   console.log(data);
//   console.log(getAuth(initializeApp(enviroment.firebase)).currentUser);
// });

// this.afAuth.signInWithRedirect(new GoogleAuthProvider());
