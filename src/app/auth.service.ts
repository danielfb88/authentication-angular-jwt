import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {UserModel} from './models/userModel';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {
    private authUrl = '/api/auth';
    private jwtHelper: JwtHelper = new JwtHelper();
    public loggedIn = new BehaviorSubject<boolean>(this.tokenAvailable());

    constructor(
        private http: HttpClient
    ) { }

    public auth(userModel: UserModel): Observable<any> {
        return this.http.post<UserModel>(this.authUrl, userModel, {observe: 'response'});
    }

    public decodeUserFromToken(token) {
        return this.jwtHelper.decodeToken(token);
    }

    public onLoggedout() {
        localStorage.removeItem('isLoggedin');
        localStorage.removeItem('x-access-token');
        localStorage.removeItem('currentUser');
        this.loggedIn.next(false);
    }

    get isLoggedIn() {
        return this.loggedIn.asObservable(); // {2}
    }

    private tokenAvailable(): boolean {
        return !!localStorage.getItem('x-access-token');
    }

}
