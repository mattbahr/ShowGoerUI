import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'app-login',
  templateUrl: '/login.component.html',
  providers: [UserService]
})
export class LoginComponent implements OnInit {

    email = '';
    password = '';
    invalidEmail = false;
    invalidPassword = false;
    rememberUser = false;

    constructor(private userService: UserService) { }

    ngOnInit() {
        if(document.cookie) {
            this.userService.autoLogin(document.cookie).then(function(res) {
                if(res != "failure") {
                    window.alert(res);
                }
            });
        }
    }

    onSubmit(): void {
        if (this.validateUserInput()) {
            this.login();
        }
    }

    login(): void {
        var selector = '';
        var validator = '';
        this.email = this.email.trim();
        this.password = this.password.trim();

        if (!this.email || !this.password) {
            return;
        }

        if(this.rememberUser) {
            selector = this.generateRandomString();
            validator = this.generateRandomString();

            document.cookie = "selector=" + selector + "; expires=Sun, 14 Nov 2117 12:00:00 UTC; path=/";
            document.cookie = "validator=" + validator + "; expires=Sun, 14 Nov 2117 12:00:00 UTC; path=/";
        }

        this.userService.login(this.email, this.password, selector, validator).then(function(res) {
            if (res == "failure") {
                window.alert("Login failed. Please try again later.");
            } else if (res.startsWith('{ "id":')) {
                window.alert(res);
            } else {
                window.alert(res);
            }
        });
    }

    validateUserInput(): boolean {
        this.invalidEmail = !this.validateEmail(this.email);
        this.invalidPassword = !this.validatePassword(this.password);
        return !this.invalidEmail && !this.invalidPassword;
    }

    handleError(error: any): void {
        window.alert(error);
    }

    validateEmail(email): boolean {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    validatePassword(password: String): boolean {
        return password.length >= 8
    }

    generateRandomString() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
}
