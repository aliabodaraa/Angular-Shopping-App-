import { Component } from '@angular/core';
import * as firebase from 'firebase/auth';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css'],
})
export class BsNavbarComponent {
  constructor(public auth: AuthService) {}
  async logout() {
    this.auth.logout();
  }
}
