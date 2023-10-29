import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginValidator } from './login.validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private auth: AuthService,
    private loginValidator: LoginValidator
  ) {}
  form = new FormGroup({
    username: new FormControl(
      '',
      Validators.required,
      this.loginValidator.shouldBeUniqueAsync.bind(this.loginValidator)
    ), //the second param is validatorFn | valiudatorFn[]  required is just a reference to the function required()
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4), //here we not calling the method in the sence of performing some kind of validation we are calling this with an argument to get the validator function
      LoginValidator.cannotContainSpace,
    ]),
  });

  get accessUserName() {
    return this.form.get('username');
  }
  get accessPassword() {
    return this.form.get('password');
  }
  login() {
    // imagine there is a service call login in this point of code
    // let isValid = serviceAuth?.login(this.form.value);
    // if (isValid) {
    //   this.form.setErrors({ invalidLogin: true });
    // }
    console.log(this.form);
    this.form.setErrors({ invalidLogin: true });
  }
  loginProvider() {
    this.auth.login();
  }
}
