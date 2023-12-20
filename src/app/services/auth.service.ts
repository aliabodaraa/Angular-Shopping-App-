import { Injectable } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, getAuth, signInWithRedirect } from 'firebase/auth';
import { Observable, of, switchMap } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment.prod';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from '../models/app-user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //acheive authentication
  user$: Observable<AppUser>;

  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private UserService: UserService
  ) {
    this.user$ = afAuth.authState as unknown as Observable<AppUser>;
  }

  async login() {
    let getReturnUrl =
      this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', getReturnUrl);

    const provider = new GoogleAuthProvider();
    return await signInWithRedirect(
      getAuth(initializeApp(enviroment.firebase)),
      provider
    ).then((x) => console.log(x, 'hello ALI'));
  }

  logout() {
    this.UserService.isUserExist('asas');
    this.afAuth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$.pipe(
      switchMap((user) => {
        if (user) return this.UserService.get(user.uid);
        else return of(null);
      })
    );
  }
}
