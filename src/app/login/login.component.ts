import {Component, OnInit} from '@angular/core';

import {UserModel} from '../models/userModel';
import {AuthService} from '../auth.service';

import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    private userModel = new UserModel();

    loginForm: FormGroup;
    message: string = '';

    email = new FormControl(
        '',
        [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100)
        ]
    );

    password = new FormControl(
        '',
        [
            Validators.required,
            Validators.minLength(3)
        ]
    );

    constructor(
        private router: Router,
        private authService: AuthService,
        private formBuilder: FormBuilder
    ) {
        this.createForm();
    }

    ngOnInit() {
        if (localStorage.getItem('isLoggedin')) {
          this.router.navigate(['/dashboard']);
        }
    }

    onLoggedin() {
        this.setMessage('');

        this.userModel.setEmail(this.loginForm.value.email);
        this.userModel.setPassword(this.loginForm.value.password);

        this.authService
        .auth(this.userModel)
        .subscribe(
            res => {
                const token = res.headers.get('x-access-token');
                const decodedUser = this.authService.decodeUserFromToken(token);

                localStorage.setItem('x-access-token', token);
                localStorage.setItem('isLoggedin', 'true');
                localStorage.setItem('currentUser', decodedUser);
                this.authService.loggedIn.next(true);
                this.router.navigate(['/dashboard']);
            },
            err => {
                console.error(err);
                this.setMessage(err.error.message);
            }
        );
    }

    createForm() {
        this.loginForm = this.formBuilder.group({
            email: this.email,
            password: this.password
        });
    }

    setMessage(message :string){
        this.message = message;
    }

}
