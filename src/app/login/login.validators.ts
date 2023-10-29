import { AbstractControl, ValidationErrors } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class LoginValidator {
  constructor(private userService: UserService) {}

  static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
    if ((control.value as string).indexOf(' ') > 0)
      return {
        cannotContainSpace: true,
      };
    return null;
  }
  async shouldBeUniqueAsync(
    control: AbstractControl
  ): Promise<ValidationErrors | null> {
    console.log('Ali');
    let isExist = await this.userService.isUserExist(control.value);
    if (isExist) return { shouldBeUniqueAsync: true };
    else return null;
  }
}
