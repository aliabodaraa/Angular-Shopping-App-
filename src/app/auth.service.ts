import { Injectable } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, getAuth, signInWithRedirect } from 'firebase/auth';
import { Observable } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment.prod';
import * as firebase from 'firebase/auth';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<firebase.UserInfo | null>;
  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.user$ = afAuth.authState;
  }
  async login() {
    let getReturnUrl =
      this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', getReturnUrl);
    const provider = new GoogleAuthProvider();
    return await signInWithRedirect(
      getAuth(initializeApp(enviroment.firebase)),
      provider
    );
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
