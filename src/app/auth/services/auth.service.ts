import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Observable, of } from 'rxjs';
import { environments } from 'src/env/env';
import {
  IAddUser,
  IAuth,
  IAuthUser,
  IGenerateToken,
  IToken,
  IUser,
  IUserToken,
} from '../interfaces/auth.interfaces';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private oauthService: OAuthService
  ) {
    this.configGoogle();
  }
  private baseUrl: string = environments.baseURL;

  get currentUser(): string {
    const token: string = localStorage.getItem('access_token') || '';
    const decodedToken: IToken = this.jwtHelper.decodeToken(token) || {
      user: { name: '', email: '' },
    };
    return decodedToken.user.name;
  }

  get currentUserGoogle() {
    return this.oauthService.getIdentityClaims();
  }

  checkAuthentication(): Observable<boolean> {
    const token = localStorage.getItem('access_token');
    const isTokenExpired = this.jwtHelper.isTokenExpired(token);
    if (isTokenExpired || !token) return of(false);
    else return of(true);
  }

  configGoogle() {
    const config: AuthConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId: environments.clientIdGoogle,
      redirectUri: window.location.origin + '/notes/home',
      scope: 'openid profile email',
    };
    this.oauthService.configure(config);
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  authGoogle() {
    this.oauthService.initLoginFlow();
  }

  generateToken(user: IUserToken): Observable<IGenerateToken> {
    return this.http.post<IGenerateToken>(
      `${this.baseUrl}/users/generate-token`,
      user
    );
  }

  authUser(user: IAuth): Observable<IAuthUser> {
    return this.http.post<IAuthUser>(`${this.baseUrl}/users/auth`, user);
  }

  addUser(user: IUser): Observable<IAddUser> {
    return this.http.post<IAddUser>(`${this.baseUrl}/users/add`, user);
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.clear();
  }

  logoutGoogle() {
    this.oauthService.logOut();
  }
}
