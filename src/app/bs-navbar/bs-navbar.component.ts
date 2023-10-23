import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/auth';
import { Observable } from 'rxjs';
@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css'],
})
export class BsNavbarComponent {
  user$: Observable<firebase.UserInfo | null>;
  constructor(private afAuth: AngularFireAuth) {
    this.user$ = afAuth.authState;
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
