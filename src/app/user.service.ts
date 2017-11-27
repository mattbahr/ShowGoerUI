
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from './user';

@Injectable()
export class UserService {

    private usersUrl = 'https://localhost:8443/users'; //url to web api
    private loginUrl = 'https://localhost:8443/login';
    private autoLoginUrl = 'https://localhost:8443/autologin';
    private requestResetPasswordUrl = 'https://localhost:8443/requestResetPassword';
    private resetPasswordUrl = 'https://localhost:8443/resetPassword';
    private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

    constructor(private http: Http) { }

    create(user: User): Promise<String> {
        var data = "email=" + user.email.trim() + "&password=" + user.password.trim() + "&type=" + user.type.trim();

        return this.http
            .post(this.usersUrl, data, { headers: this.headers })
            .toPromise()
            .then(res => res.text() as String)
            .catch(this.handleSignUpError);
    }

    login(email: String, password: String, selector: String, validator: String): Promise<String> {
        var data = "email=" + email.trim() + "&password=" + password.trim() + "&selector=" + selector.trim() + "&validator=" + validator.trim();

        return this.http
            .post(this.loginUrl, data, { headers: this.headers })
            .toPromise()
            .then(res => res.text() as String)
            .catch(this.handleLoginError);
    }

    autoLogin(cookie: String): Promise<String> {
        var data = "cookie=" + cookie.trim();

        return this.http
            .post(this.autoLoginUrl, data, { headers: this.headers })
            .toPromise()
            .then(res => res.text() as String)
            .catch(this.handleAutoLoginError);
    }

    resetPassword(validationKey: String, password: String): Promise<String> {
        var data="sId=" + validationKey.trim() + "&password=" + password.trim();

        return this.http
            .post(this.resetPasswordUrl, data, { headers: this.headers })
            .toPromise()
            .then(res => res.text() as String)
            .catch(this.handleResetPasswordError);
    }

    requestPasswordResetLink(email: String): Promise<String> {
        var data="email=" + email.trim();

        return this.http
            .post(this.requestResetPasswordUrl, data, { headers: this.headers })
            .toPromise()
            .then(res => res.text() as String)
            .catch(this.handleRequestResetError);
    }

    private handleSignUpError(error: any): Promise<any> {
        window.alert("Sign up failed: " + error);
        return Promise.reject(error.message || error);
    }

    private handleLoginError(error: any): Promise<any> {
        window.alert("Login failed: " + error);
        return Promise.reject(error.message || error);
    }

    private handleAutoLoginError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }

    private handleRequestResetError(error: any): Promise<any> {
        window.alert("Request failed: " + error);
        return Promise.reject(error.message || error);
    }

    private handleResetPasswordError(error: any): Promise<any> {
        window.alert("Failed to reset password. Please try again by selecting 'Forgot Password?' on the Home screen and entering your email address.");
        return Promise.reject(error.message || error);
    }
}
