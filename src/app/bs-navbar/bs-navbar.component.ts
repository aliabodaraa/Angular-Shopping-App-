import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AppUser } from '../models/app-user';
@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css'],
})
export class BsNavbarComponent {
  appUserBs: AppUser = null;
  constructor(public auth: AuthService) {
    this.auth.appUser$.subscribe((appUser) => (this.appUserBs = appUser));
    // Do we need to unsubscribe here?
    // In my opinion, no, because we have a single instance of this navbar component in the Dom.
    // So this subscription is going to stay there for the lifetime of our application and that's something
    // we want anyway, because if the authentication status of the user changes, we want to rerender the navigation bar.
    // So we want to keep the subscription, but because we're not going to have multiple instances of this component in the Dom, we're not going to have memory leaks.
  }
  logout() {
    this.auth.logout();
  }
}
