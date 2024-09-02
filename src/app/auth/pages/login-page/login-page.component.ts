import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { validateEmail } from 'src/app/shared/utils';
import {
  IAuthUser,
  IErrorService,
  IGenerateToken,
} from '../../interfaces/auth.interfaces';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    const data = this.authService.currentUserGoogle;
    if (data !== null) {
      const { name, email } = data;
      this.authService
        .generateToken({ name, email })
        .subscribe((tokenService: IGenerateToken) => {
          localStorage.setItem('access_token', tokenService.token);
          this.router.navigate(['/notes/home']);
        });
    }
  }

  public isLoading: boolean = false;
  public showPassword: boolean = false;
  public typePassword: string = 'password';
  public errorsInputs: any = {
    email: '',
    password: '',
  };
  public loginForm = new FormGroup({
    email: new FormControl<string>(''),
    password: new FormControl<string>(''),
  });
  private messageEmptysInputs: any = {
    email: 'Se debe ingresar un correo.',
    password: 'Se debe ingresar contraseña.',
  };

  onClickShowPassword() {
    this.showPassword = !this.showPassword;
    if (this.typePassword === 'password') {
      this.typePassword = 'text';
    } else this.typePassword = 'password';
  }

  cleanErrors() {
    this.errorsInputs.email = '';
    this.errorsInputs.name = '';
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

  onClickLogin(): void {
    const { email, password } = this.loginForm.value;
    let successValidation: boolean = false;
    if (email === '') this.errorsInputs.email = this.messageEmptysInputs.email;
    if (!validateEmail(email ? email : '')) {
      this.errorsInputs.email = 'Debes ingresar un correo válido.';
    }
    if (password === '')
      this.errorsInputs.password = this.messageEmptysInputs.password;
    if (email === '' || password === '') {
      successValidation = false;
      return;
    }
    if (email !== '' || password !== '') {
      successValidation = true;
    }
    if (successValidation) {
      this.cleanErrors();
      this.isLoading = true;
      const bodyParams = {
        email: email ? email : '',
        password: password ? password : '',
      };
      this.authService
        .authUser(bodyParams)
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
        .subscribe((userService: IAuthUser) => {
          if (userService.message !== '')
            this.showSnackbar(userService.message);
          if (userService.token !== '') {
            localStorage.setItem('access_token', userService.token);
            this.router.navigate(['/notes/home']);
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

  onClickLoginGoogle(): void {
    this.authService.authGoogle();
  }
}
