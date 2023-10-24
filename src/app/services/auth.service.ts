import { Injectable } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, getAuth, signInWithRedirect } from 'firebase/auth';
import { Observable } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment.prod';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from '../models/app-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //acheive authentication
  user$: Observable<AppUser | null>;
  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute) {
    this.user$ = afAuth.authState as unknown as Observable<AppUser>;
  }
  login() {
    let getReturnUrl =
      this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', getReturnUrl);

    const provider = new GoogleAuthProvider();
    return signInWithRedirect(
      getAuth(initializeApp(enviroment.firebase)),
      provider
    );
  }
  logout() {
    this.afAuth.signOut();
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
