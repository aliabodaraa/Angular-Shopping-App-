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
    return this.auth.appUser$.pipe(
      map((authUser) => {
        if (!authUser) return false;
        return authUser.isAdmin;
      })
    );
  }
}
