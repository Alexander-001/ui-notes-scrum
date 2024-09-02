import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { validateEmail } from 'src/app/shared/utils';
import { IAddUser, IErrorService } from '../../interfaces/auth.interfaces';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: 'register-page.component.html',
})
export class RegisterPageComponent {
  constructor(
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  public isLoading: boolean = false;
  public showPassword: boolean = false;
  public typePassword: string = 'password';
  public typeConfirmPassword: string = 'password';
  public showConfirmPassword: boolean = false;
  public registerForm = new FormGroup({
    email: new FormControl<string>(''),
    name: new FormControl<string>(''),
    password: new FormControl<string>(''),
    confirmPassword: new FormControl<string>(''),
  });
  public errorsInputs: any = {
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  };
  private messageEmptysInputs: any = {
    email: 'Se debe ingresar un correo.',
    name: 'Se debe ingresar nombre de usuario.',
    password: 'Se debe ingresar contraseña.',
    confirmPassword: 'Se debe ingresar confirmación de contraseña',
  };

  onClickShowPassword() {
    this.showPassword = !this.showPassword;
    if (this.typePassword === 'password') {
      this.typePassword = 'text';
    } else this.typePassword = 'password';
  }

  onClickShowConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
    if (this.typeConfirmPassword === 'password') {
      this.typeConfirmPassword = 'text';
    } else this.typeConfirmPassword = 'password';
  }

  cleanErrors() {
    this.errorsInputs.email = '';
    this.errorsInputs.name = '';
    this.errorsInputs.password = '';
    this.errorsInputs.confirmPassword = '';
  }

  onChangeEvent(event: Event): void {
    const { name } = event.target as HTMLInputElement;
    this.errorsInputs[name] = '';
  }

  onBlurEvent(event: Event): void {
    const { name, value } = event.target as HTMLInputElement;
    if (name === 'email') {
      if (!validateEmail(value)) {
        this.errorsInputs.email = 'Debes ingresar un correo válido.';
      }
    }
    if (value === '') {
      this.errorsInputs[name] = this.messageEmptysInputs[name];
    }
  }

  onClickCreateAccount(): void {
    const { email, name, password, confirmPassword } = this.registerForm.value;
    let successValidation: boolean = false;
    if (email === '') this.errorsInputs.email = this.messageEmptysInputs.email;
    if (!validateEmail(email ? email : '')) {
      this.errorsInputs.email = 'Debes ingresar un correo válido.';
    }
    if (name === '') this.errorsInputs.name = this.messageEmptysInputs.name;
    if (password === '')
      this.errorsInputs.password = this.messageEmptysInputs.password;
    if (confirmPassword === '')
      this.errorsInputs.confirmPassword =
        this.messageEmptysInputs.confirmPassword;
    if (
      email === '' ||
      name === '' ||
      password === '' ||
      confirmPassword === ''
    ) {
      successValidation = false;
      return;
    }
    if (password !== confirmPassword) {
      this.errorsInputs.password = 'Contraseñas no coindicen';
      this.errorsInputs.confirmPassword = 'Contraseñas no coindicen';
      return;
    }
    if (
      email !== '' ||
      name !== '' ||
      password !== '' ||
      confirmPassword !== ''
    ) {
      successValidation = true;
    }

    if (successValidation) {
      this.cleanErrors();
      this.isLoading = true;
      const bodyParams = {
        email: email ? email : '',
        name: name ? name : '',
        password: password ? password : '',
      };
      this.authService
        .addUser(bodyParams)
        .pipe(
          tap((userService: any) => {
            const errorsService: IErrorService[] = userService.errors || [];
            if (errorsService.length > 0) {
              for (let i = 0; i < errorsService.length; i++) {
                const { path, msg } = errorsService[i];
                const errors: any = this.errorsInputs;
                errors[path] = msg;
              }
            }
            this.isLoading = false;
          })
        )
        .subscribe((userService: IAddUser) => {
          if (userService.message !== '') {
            this.showSnackbar(userService.message);
          }
          if (Object.keys(userService).length !== 0) {
            this.router.navigate(['/auth/login']);
          }
          this.isLoading = false;
        });
    }
  }

  showSnackbar(message: string): void {
    this.snackbar.open(message, 'Ok', {
      duration: 2500,
    });
  }
}
