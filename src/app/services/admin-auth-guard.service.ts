import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard {
  constructor(private auth: AuthService) {}

  canActivate(): Observable<boolean> {
    return this.auth.appUser$.pipe(
      map((authUser) => {
        if (!authUser) return false;
        return authUser.isAdmin;
      })
    );
  }
}
