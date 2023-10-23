import { Component } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from 'firebase/auth';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { enviroment } from 'src/enviroments/enviroment.prod';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private router: Router) {}

  async login() {
    // signInWithEmailAndPassword(
    //   getAuth(initializeApp(enviroment.firebase)),
    //   'abodaraaali50@gmail.com',
    //   'MasterR540'
    // ).then((data) => {
    //   console.log('succes Sign-In');
    //   console.log(data);
    //   console.log(getAuth(initializeApp(enviroment.firebase)).currentUser);
    // });
    const provider = new GoogleAuthProvider();
    // provider.setCustomParameters({
    //   providerId: 'google.com',
    // });
    // provider.addScope('profile');
    await signInWithRedirect(
      getAuth(initializeApp(enviroment.firebase)),
      provider
    )
      .then((result) => {
        console.log(result);
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        console.log(error.code);
        alert(error.message);
      });
    // this.afAuth.signInWithRedirect(new GoogleAuthProvider());
  }
}
