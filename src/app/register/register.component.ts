import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginValidator } from '../login/login.validators';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private auth: AuthService,
    private LoginValidator: LoginValidator
  ) {}
  form = new FormGroup({
    email: new FormControl(
      '',
      Validators.required,
      this.LoginValidator.shouldBeUniqueAsync.bind(this.LoginValidator)
    ),
    username: new FormControl(
      '',
      Validators.required,
      this.LoginValidator.shouldBeUniqueAsync.bind(this.LoginValidator)
    ), //the second param is validatorFn | valiudatorFn[]  required is just a reference to the function required()
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4), //here we not calling the method in the sence of performing some kind of validation we are calling this with an argument to get the validator function
    ]),
  });

  get accessEmail() {
    return this.form.get('email');
  }
  get accessUserName() {
    return this.form.get('username');
  }
  get accessPassword() {
    return this.form.get('password');
  }
  register() {
    console.log(this.form);
    this.form.setErrors({ invalidRegister: true });
  }
  registerProvider() {
    // signInWithEmailAndPassword(
    //   getAuth(initializeApp(enviroment.firebase)),
    //   'abodaraaali50@gmail.com',
    //   'MasterR540'
    // ).then((data) => {
    //   console.log('succes Sign-In');
    //   console.log(data);
    //   console.log(getAuth(initializeApp(enviroment.firebase)).currentUser);
    // });
  }
}
