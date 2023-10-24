import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, from, map, of, switchMap } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard {
  constructor(private auth: AuthService, private UserService: UserService) {}
  canActivate(): Observable<boolean> {
    return this.auth.user$.pipe(
      switchMap((user) => {
        return this.UserService.get(user?.uid!).valueChanges();
      }),
      map((authUser) => {
        console.log(authUser);
        return authUser?.isAdmin as boolean;
      })
    );
  }
}
